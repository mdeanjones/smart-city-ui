import Ember from 'ember';

const { Route, inject, get } = Ember;


export default Route.extend({
  mapService: inject.service('smart-city-maps'),


  // Load fixture data when the application first initializes.
  beforeModel() {
    return get(this, 'mapService.store').load();
  },
});
