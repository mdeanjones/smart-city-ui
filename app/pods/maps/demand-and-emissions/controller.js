import Ember from 'ember';

const {
  Controller,
  inject,
  get,
} = Ember;


export default Controller.extend({
  mapService: inject.service('smart-city-maps'),

  actions: {
    mapReady(map) {
      get(this, 'mapService')
        .updateTargetMap(map)
        .setZoom()
        .setCenter();
    },

    aggregateOrSweepToggleChange(isChecked) {
      console.log(`The aggregate or sweep toggle switch is currently set to "${isChecked ? 'Aggregate' : 'Sweep'}"`);
    }
  }
});
