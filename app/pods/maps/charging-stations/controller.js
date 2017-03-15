import Ember from 'ember';

const { Controller, inject, get, set, observer } = Ember;


export default Controller.extend({
  mapService: inject.service('smart-city-maps'),

  map: null,

  mapFeatureToggles: {
    proposedEv: false,
    currentEv: false,
    gas: false,
    buses: false,
    parks: false,
    schools: false,
  },

  zoningToggles: {
    agriculture: false,
    commercial: false,
    downtown: false,
    industrial: false,
    parking: false,
    publicLand: false,
    residentialSingle: false,
    residentialMulti: false,
  },


  proposedEvObserver: observer('mapFeatureToggles.proposedEv', function() {
    this._toggleLayer(get(this, 'mapFeatureToggles.proposedEv'), 'proposedEvLocationLayer');
  }),


  currentEvObserver: observer('mapFeatureToggles.currentEv', function() {
    this._toggleLayer(get(this, 'mapFeatureToggles.currentEv'), 'currentEvLocationLayer');
  }),


  gasObserver: observer('mapFeatureToggles.gas', function() {
    this._toggleLayer(get(this, 'mapFeatureToggles.gas'), 'gasLocationLayer');
  }),


  agricultureZoneObserver: observer('zoningToggles.agriculture', function() {
    this._toggleLayer(get(this, 'zoningToggles.agriculture'), 'agricultureZoneLayer');
  }),


  commercialZoneObserver: observer('zoningToggles.commercial', function() {
    this._toggleLayer(get(this, 'zoningToggles.commercial'), 'commercialZoneLayer');
  }),


  downtownZoneObserver: observer('zoningToggles.downtown', function() {
    this._toggleLayer(get(this, 'zoningToggles.downtown'), 'downtownZoneLayer');
  }),


  industrialZoneObserver: observer('zoningToggles.industrial', function() {
    this._toggleLayer(get(this, 'zoningToggles.industrial'), 'industrialZoneLayer');
  }),


  parkingZoneObserver: observer('zoningToggles.parking', function() {
    this._toggleLayer(get(this, 'zoningToggles.parking'), 'parkingZoneLayer');
  }),


  publicLandZoneObserver: observer('zoningToggles.publicLand', function() {
    this._toggleLayer(get(this, 'zoningToggles.publicLand'), 'publicLandZoneLayer');
  }),


  residentialSingeZoneObserver: observer('zoningToggles.residentialSingle', function() {
    this._toggleLayer(get(this, 'zoningToggles.residentialSingle'), 'residentialSingleZoneLayer');
  }),


  residentialMultiZoneObserver: observer('zoningToggles.residentialMulti', function() {
    this._toggleLayer(get(this, 'zoningToggles.residentialMulti'), 'residentialMultiZoneLayer');
  }),


  actions: {
    mapReady(map) {
      set(this, 'map', map);

      get(this, 'mapService')
        .setMap(map)
        .addLayer('grayScaleLayer')
        .setZoom()
        .setCenter();
    },
  },


  _toggleLayer(show, layerName) {
    if (show) {
      get(this, 'mapService').addLayer(layerName);
    }
    else {
      get(this, 'mapService').removeLayer(layerName);
    }
  },
});
