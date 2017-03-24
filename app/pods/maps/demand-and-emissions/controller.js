import Ember from 'ember';

const {
  Controller,
  inject,
  get,
} = Ember;


export default Controller.extend({
  mapService: inject.service('smart-city-maps'),

  dataConductor: inject.service('smart-city-data-conductor'),


  actions: {
    mapReady(map) {
      get(this, 'mapService')
        .updateTargetMap(map)
        .setZoom()
        .setCenter();
    },
  },
});
