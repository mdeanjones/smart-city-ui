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

    demandOrEmissionsToggleChange(isChecked) {
      console.log(`The demand or emissions toggle switch is currently set to "${isChecked ? 'Demand' : 'Emissions'}"`);
    },

    evOrGasToggleChange(isChecked) {
      console.log(`The EV or gas toggle switch is currently set to "${isChecked ? 'Ev' : 'Gas'}"`);
    },

    aggregateOrSweepToggleChange(isChecked) {
      console.log(`The aggregate or sweep toggle switch is currently set to "${isChecked ? 'Aggregate' : 'Sweep'}"`);
    }


  }
});
