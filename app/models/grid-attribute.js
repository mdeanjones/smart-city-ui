import DS from 'ember-data';
import Ember from 'ember';


const { Model, attr } = DS;
const { computed, get } = Ember;


export default Model.extend({
  lat1: attr('number'),

  lng1: attr('number'),

  lat2: attr('number'),

  lng2: attr('number'),


  score: attr('number'),

  pud: attr('number'),

  busStops: attr('number'),

  schools: attr('number'),

  isPark: attr('number'),

  gasStations: attr('number'),

  vehicles: attr('number'),

  unzoned: attr('number'),


  ag: attr('number'),


  c1: attr('number'),

  c1a: attr('number'),

  c1ar: attr('number'),

  c2a: attr('number'),

  c2ar: attr('number'),

  c2br: attr('number'),

  c3: attr('number'),

  c1b: attr('number'),

  c2b: attr('number'),


  r1c: attr('number'),

  r1b: attr('number'),

  r3: attr('number'),

  r5: attr('number'),

  r6: attr('number'),

  r4c: attr('number'),

  r4d: attr('number'),

  r2a: attr('number'),

  r4a: attr('number'),

  r1e: attr('number'),

  r2b: attr('number'),

  r1d: attr('number'),

  re: attr('number'),

  r1a: attr('number'),

  r4b: attr('number'),


  m1a: attr('number'),

  p: attr('number'),

  m1: attr('number'),

  orl: attr('number'),

  m2: attr('number'),


  d1: attr('number'),

  d2: attr('number'),

  o: attr('number'),

  pl: attr('number'),

  twp: attr('number'),


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
