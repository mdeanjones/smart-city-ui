import Ember from 'ember';
import ENV from 'smart-city-ui/config/environment';

const {
  Service,
  inject,
  get,
  set,
  RSVP: {
    resolve,
  },
} = Ember;


export default Service.extend({
  ajax: inject.service(),

  isLoading: false,

  cache: {},

  rootPath: `${ENV.rootURL}grid-data/`,


  hasEntry(key) {
    return !!get(this, 'cache')[key];
  },


  addEntry(key, value) {
    get(this, 'cache')[key] = value;
    return true;
  },


  getEntry(key) {
    if (this.hasEntry(key)) {
      return resolve(get(this, 'cache')[key]);
    }
    else {
      return this.load(key);
    }
  },


  load(path) {
    set(this, 'isLoading', true);

    return get(this, 'ajax').request(path).then((results) => {
      this.addEntry(path, results);
      set(this, 'isLoading', false);

      return results;
    });
  },


  buildPath(parts, extension = '.json') {
    return `${get(this, 'rootPath')}${parts.join('/')}${extension}`;
  },
});
