/* global L */
import DS from 'ember-data';
import Ember from 'ember';


const {
  Model,
  attr,
  hasMany,
} = DS;

const {
  computed,
  get,
  getProperties,
} = Ember;


export default Model.extend({
  busStops: attr('number'),
  gasStations: attr('number'),
  isPark: attr('number'),

  lat1: attr('number'),
  lat2: attr('number'),
  lng1: attr('number'),
  lng2: attr('number'),

  schools: attr('number'),
  score: attr('number'),
  unzoned: attr('number'),
  vehicles: attr('number'),

  currentEVStations: hasMany('existing-charging-station'),

  agricultureOpenSpace: attr('number', {
    ident: 'ag',
  }),

  businessLocal: attr('number', {
    ident: 'c1',
  }),

  businessCampus: attr('number', {
    ident: 'c1a',
  }),

  businessCampusResidential: attr('number', {
    ident: 'c1ar',
  }),

  businessCentral: attr('number', {
    ident: 'c2a',
  }),

  businessService: attr('number', {
    ident: 'c2b',
  }),

  businessServiceResidential: attr('number', {
    ident: 'c2br',
  }),

  commercialResidential: attr('number', {
    ident: 'c2ar',
  }),

  commercialFringe: attr('number', {
    ident: 'c3',
  }),

  communityConvenienceCenter: attr('number', {
    ident: 'c1b',
  }),

  downtownCore: attr('number', {
    ident: 'd1',
  }),

  downtownInterface: attr('number', {
    ident: 'd2',
  }),

  industrialHeavy: attr('number', {
    ident: 'm2',
  }),

  industrialLimited: attr('number', {
    ident: 'm1',
  }),

  industrialLimitedLight: attr('number', {
    ident: 'm1a',
  }),

  motelHotel: attr('number', {
    ident: 'r5'
  }),

  r1e: attr('number', {
    ident: 'r1e',
  }),

  residentialDualA: attr('number', {
    ident: 'r2a',
  }),

  residentialDualB: attr('number', {
    ident: 'r2b',
  }),

  residentialMobileHomePark: attr('number', {
    ident: 'r6',
  }),

  residentialMultiA: attr('number', {
    ident: 'r4a',
  }),

  residentialMultiB: attr('number', {
    ident: 'r4b',
  }),

  residentialMultiC: attr('number', {
    ident: 'r4c',
  }),

  residentialMultiD: attr('number', {
    ident: 'r4d',
  }),

  residentialSingleA: attr('number', {
    ident: 'r1a',
  }),

  residentialSingleB: attr('number', {
    ident: 'r1b',
  }),

  residentialSingleC: attr('number', {
    ident: 'r1c',
  }),

  residentialSingleD: attr('number', {
    ident: 'r1d',
  }),

  residentialTownhouse: attr('number', {
    ident: 'r3',
  }),

  office: attr('number', {
    ident: 'o',
  }),

  officeResearchLimitedIndustrial: attr('number', {
    ident: 'orl',
  }),

  parking: attr('number', {
    ident: 'p',
  }),

  plannedUnitDevelopment: attr('number', {
    ident: 'pud',
  }),

  publicLand: attr('number', {
    ident: 'pl',
  }),

  research: attr('number', {
    ident: 're',
  }),

  twp: attr('number', {
    ident: 'twp',
  }),


  upperLeftBound: computed('lat1', 'lng1', function() {
    return [parseFloat(get(this, 'lat1')), parseFloat(get(this, 'lng1'))];
  }).readOnly(),


  lowerRightBound: computed('lat2', 'lng2', function() {
    return [parseFloat(get(this, 'lat2')), parseFloat(get(this, 'lng2'))];
  }).readOnly(),


  bounds: computed('upperLeftBound', 'lowerRightBound', function() {
    return [get(this, 'upperLeftBound'), get(this, 'lowerRightBound')];
  }).readOnly(),


  latLngBounds: computed('bounds', function() {
    return L.latLngBounds(get(this, 'bounds'));
  }).readOnly(),


  // Computed roll-ups
  agricultureRollupValue: computed.sum('agricultureRollupKeys'),

  commercialRollupValue: computed.sum('commercialRollupKeys'),

  residentialSingleRollupValue: computed.sum('residentialSingleRollupKeys'),

  residentialMultiRollupValue: computed.sum('residentialMultiRollupKeys'),

  industrialRollupValue: computed.sum('industrialRollupKeys'),

  downtownRollupValue: computed.sum('downtownRollupKeys'),

  publicLandRollupValue: computed.sum('publicLandRollupKeys'),

  pudRollupValue: computed.sum('pudRollupKeys'),

  parkingRollupValue: computed.sum('parkingRollupKeys'),


  // The arrays which define what the computed roll-ups should be summing
  agricultureRollupKeys: computed.collect('agricultureOpenSpace'),

  commercialRollupKeys: computed.collect('businessLocal', 'businessCampus',
    'businessCampusResidential', 'businessCentral', 'businessService',
    'businessServiceResidential', 'commercialResidential', 'commercialFringe',
    'communityConvenienceCenter', 'motelHotel', 'office',
    'officeResearchLimitedIndustrial', 'research'),

  residentialSingleRollupKeys: computed.collect('r1e', 'residentialMobileHomePark',
    'residentialSingleA', 'residentialSingleB', 'residentialSingleC', 'residentialSingleD'),

  residentialMultiRollupKeys: computed.collect('residentialDualA', 'residentialDualB',
    'residentialMultiA', 'residentialMultiB', 'residentialMultiC', 'residentialMultiD',
    'residentialTownhouse'),

  industrialRollupKeys: computed.collect('industrialHeavy', 'industrialLimited', 'industrialLimitedLight'),

  downtownRollupKeys: computed.collect('downtownCore', 'downtownInterface'),

  publicLandRollupKeys: computed.collect('publicLand'),

  pudRollupKeys: computed.collect('plannedUnitDevelopment'),

  parkingRollupKeys: computed.collect('parking'),


  rollupValueStringArray: computed('agricultureRollupValue', 'commercialRollupValue', 'downtownRollupValue',
    'industrialRollupValue', 'parkingRollupValue', 'publicLandRollupValue', 'residentialSingleRollupValue',
    'residentialMultiRollupValue', function() {
      const zones = [];

      const {
        agricultureRollupValue,
        commercialRollupValue,
        downtownRollupValue,
        industrialRollupValue,
        parkingRollupValue,
        publicLandRollupValue,
        residentialSingleRollupValue,
        residentialMultiRollupValue,
      } = getProperties(this, ['agricultureRollupValue', 'commercialRollupValue', 'downtownRollupValue',
        'industrialRollupValue', 'parkingRollupValue', 'publicLandRollupValue', 'residentialSingleRollupValue',
        'residentialMultiRollupValue']);

      if (agricultureRollupValue) {
        zones.push('Agriculture');
      }

      if (commercialRollupValue) {
        zones.push('Commercial');
      }

      if (downtownRollupValue) {
        zones.push('Downtown');
      }

      if (industrialRollupValue) {
        zones.push('Industrial');
      }

      if (parkingRollupValue) {
        zones.push('Parking');
      }

      if (publicLandRollupValue) {
        zones.push('Public Land');
      }

      if (residentialSingleRollupValue) {
        zones.push('Residential Single Family');
      }

      if (residentialMultiRollupValue) {
        zones.push('Residential Multi-family');
      }

      return zones;
  }),


  cellDetailsHtml: computed('rollupValueStringArray', 'currentEvStations.length', 'gasStations',
    'busStops', 'schools', 'isPark', 'score', function() {
      return `
          <p class="features-title">Cell Name/Number</p>
          <hr class="rule">
          <p class="heading">Features:</p>
          
          <table class="features-table">
              <tbody>
                    <tr>
                      <td><strong>${get(this, 'score')}</strong></td>
                      <td>Recommended Charging Score (1-6)</td>
                  </tr>
                  <tr>
                      <td><strong>${get(this, 'currentEVStations.length')}</strong></td>
                      <td>Existing Charging Stations</td>
                  </tr>
                  <tr>
                      <td><strong>${get(this, 'gasStations')}</strong></td>
                      <td>Gas Stations</td>
                  </tr>
                  <tr>
                      <td><strong>${get(this, 'busStops')}</strong></td>
                      <td>Bus Stops</td>
                  </tr>
                  <tr>
                      <td><strong>${get(this, 'schools')}</strong></td>
                      <td>Schools</td>
                  </tr>
                  <tr>
                      <td><strong>${get(this, 'isPark')}</strong></td>
                      <td>Parks</td>
                  </tr>
              </tbody>
          </table>
          
          <p class="heading">Zones:</p>
          <p class="zones-list">${get(this, 'rollupValueStringArray').join(', ')}</p>
      `;
  }),
});
