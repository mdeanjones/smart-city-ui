import Ember from 'ember';

const {
  Route,
  get,
  inject,
} = Ember;


export default Route.extend({
  mapService: inject.service('smart-city-maps'),

  actions: {
    didTransition() {
      get(this, 'mapService.gridCells').disableHeatMap();
    },
  },
});
