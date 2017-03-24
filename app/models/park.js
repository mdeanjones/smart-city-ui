import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr } = DS;
const { computed, get } = Ember;


export default Model.extend({
  lat1: attr('number'),

  lng1: attr('number'),

  lat2: attr('number'),

  lng2: attr('number'),


  upperLeftBound: computed('lat1', 'lng1', function() {
    return [parseFloat(get(this, 'lat1')), parseFloat(get(this, 'lng1'))];
  }).readOnly(),


  lowerRightBound: computed('lat2', 'lng2', function() {
    return [parseFloat(get(this, 'lat2')), parseFloat(get(this, 'lng2'))];
  }).readOnly(),


  bounds: computed('upperLeftBound', 'lowerRightBound', function() {
    return [get(this, 'upperLeftBound'), get(this, 'lowerRightBound')];
  }).readOnly(),
});
