import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr } = DS;
const { computed, get } = Ember;

const ZONE_RESIDENTIAL_SINGLE_FAMILY = 'Residental_Single_Family';
const ZONE_RESIDENTIAL_MULTI_FAMILY = 'Residental_Multiple_Family';
const ZONE_COMMERCIAL = 'Commercial';
const ZONE_PARKING = 'Parking';
const ZONE_DOWNTOWN = 'Downtown';
const ZONE_INDUSTRIAL = 'Industrial';
const ZONE_AGRICULTURE = 'Agriculture';
const ZONE_PUBLIC_LAND = 'Public_Land';

export {
  ZONE_RESIDENTIAL_SINGLE_FAMILY,
  ZONE_RESIDENTIAL_MULTI_FAMILY,
  ZONE_COMMERCIAL,
  ZONE_PARKING,
  ZONE_DOWNTOWN,
  ZONE_INDUSTRIAL,
  ZONE_AGRICULTURE,
  ZONE_PUBLIC_LAND,
};


export default Model.extend({
  type: attr('string'),

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


  isAgricultureZone: computed('type', function() {
    return get(this, 'type') === ZONE_AGRICULTURE;
  }).readOnly(),


  isCommercialZone: computed('type', function() {
    return get(this, 'type') === ZONE_COMMERCIAL;
  }).readOnly(),


  isDowntownZone: computed('type', function() {
    return get(this, 'type') === ZONE_DOWNTOWN;
  }).readOnly(),


  isIndustrialZone: computed('type', function() {
    return get(this, 'type') === ZONE_INDUSTRIAL;
  }).readOnly(),


  isParkingZone: computed('type', function() {
    return get(this, 'type') === ZONE_PARKING;
  }).readOnly(),


  isPublicLandZone: computed('type', function() {
    return get(this, 'type') === ZONE_PUBLIC_LAND;
  }).readOnly(),


  isResidentialSingleZone: computed('type', function() {
    return get(this, 'type') === ZONE_RESIDENTIAL_SINGLE_FAMILY;
  }).readOnly(),


  isResidentialMultiZone: computed('type', function() {
    return get(this, 'type') === ZONE_RESIDENTIAL_MULTI_FAMILY;
  }).readOnly(),
});
