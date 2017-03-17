import DS from 'ember-data';
import Ember from 'ember';


const { Model, attr } = DS;
const { computed, get } = Ember;


export default Model.extend({
  agricultureOpenSpace: attr('number'),

  businessLocal: attr('number'),
  businessCampus: attr('number'),
  businessCampusResidential: attr('number'),
  businessCentral: attr('number'),
  businessService: attr('number'),
  businessServiceResidential: attr('number'),

  busStops: attr('number'),

  commercialResidential: attr('number'),
  commercialFringe: attr('number'),

  communityConvenienceCenter: attr('number'),

  downtownCore: attr('number'),
  downtownInterface: attr('number'),

  gasStations: attr('number'),

  industrialHeavy: attr('number'),
  industrialLimited: attr('number'),
  industrialLimitedLight: attr('number'),

  isPark: attr('number'),

  lat1: attr('number'),
  lat2: attr('number'),
  lng1: attr('number'),
  lng2: attr('number'),

  motelHotel: attr('number'),

  r1e: attr('number'),

  residentialDualA: attr('number'),
  residentialDualB: attr('number'),
  residentialMobileHomePark: attr('number'),
  residentialMultiA: attr('number'),
  residentialMultiB: attr('number'),
  residentialMultiC: attr('number'),
  residentialMultiD: attr('number'),
  residentialSingleA: attr('number'),
  residentialSingleB: attr('number'),
  residentialSingleC: attr('number'),
  residentialSingleD: attr('number'),
  residentialTownhouse: attr('number'),

  research: attr('number'),

  office: attr('number'),
  officeResearchLimitedIndustrial: attr('number'),

  parking: attr('number'),
  plannedUnitDevelopment: attr('number'),
  publicLand: attr('number'),

  schools: attr('number'),

  score: attr('number'),

  twp: attr('number'),

  unzoned: attr('number'),

  vehicles: attr('number'),


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
