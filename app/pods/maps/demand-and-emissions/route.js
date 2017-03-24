import Ember from 'ember';

const {
  Route,
  inject,
  get,
} = Ember;


export default Route.extend({
  mapService: inject.service('smart-city-maps'),

  dataConductor: inject.service('smart-city-data-conductor'),

  model() {
    // Loads the initial set based on whatever the default are
    return get(this, 'dataConductor').changeDataSet();
  },

  actions: {
    didTransition() {
      get(this, 'mapService.gridCells').enableHeatMap();
    },
  },
});
