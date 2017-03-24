import Ember from 'ember';

const {
  Route,
  RSVP: {
    hash,
  },
  get,
  inject,
} = Ember;


export default Route.extend({
  mapService: inject.service('smart-city-maps'),

  ajax: inject.service(),


  // Load fixture data when the application first initializes.
  beforeModel() {
    return hash({
      existingEv: this.store.findAll('existing-charging-station'),
      gasStations: this.store.findAll('gas-station-location'),
      busStops: this.store.findAll('bus-stop'),
      grid: this.store.findAll('grid-attribute'),
      zones: this.store.findAll('zone-class-cord'),
    }).then((results) => {
      const ajax = get(this, 'ajax');

      // Start by getting the overall layer boundaries to prune the set of
      // charging stations that will need to be compared.
      const layer = get(this, 'mapService.gridAttributes');
      const currentEv = layer.containsArrayItems(results.existingEv);

      for (let i = 0; i < get(results.grid, 'length'); i += 1) {
        const target = results.grid.objectAt(i);

        if (get(currentEv, 'length')) {
          const doesContain = target.containsArrayItems(currentEv);

          if (doesContain && get(doesContain, 'length')) {
            get(target, 'currentEVStations').pushObjects(doesContain);
          }
        }
      }

      layer.rebuildLayer();
    });
  },
});
