import DS from 'ember-data';

const { RESTSerializer } = DS;


export default RESTSerializer.extend({
  attrs: {
    lng1: 'long1',
    lng2: 'long2',
  }
});
