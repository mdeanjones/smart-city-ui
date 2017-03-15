import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr } = DS;
const { computed, get } = Ember;


export default Model.extend({
  lat: attr('number'),

  lng: attr('number'),


  coordinates: computed('lat', 'lng', function() {
    return [parseFloat(get(this, 'lat')), parseFloat(get(this, 'lng'))];
  }).readOnly(),
});
