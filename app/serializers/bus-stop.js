import DS from 'ember-data';

const { RESTSerializer } = DS;


export default RESTSerializer.extend({
  attrs: {
    lng: 'long',
  }
});
