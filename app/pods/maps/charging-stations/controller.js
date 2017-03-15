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


  proposedEvObserver: observer('mapFeatureToggles.proposedEv', function() {
    this._toggleLayer(get(this, 'mapFeatureToggles.proposedEv'), 'proposedEvLocationLayer');
  }),


  currentEvObserver: observer('mapFeatureToggles.currentEv', function() {
    this._toggleLayer(get(this, 'mapFeatureToggles.currentEv'), 'currentEvLocationLayer');
  }),


  gasObserver: observer('mapFeatureToggles.gas', function() {
    this._toggleLayer(get(this, 'mapFeatureToggles.gas'), 'gasLocationLayer');
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
