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


  // Load fixture data when the application first initializes.
  beforeModel() {
    return hash({
      proposedEv: this.store.findAll('ev-station-location'),
      existingEv: this.store.findAll('existing-charging-station'),
      gasStations: this.store.findAll('gas-station-location'),
      busStops: this.store.findAll('bus-stop'),
      grid: this.store.findAll('grid-attribute'),
      zones: this.store.findAll('zone-class-cord'),
    }).then((results) => {
      // Start by getting the overall layer boundaries to prune the set of
      // charging stations that will need to be compared.
      const layer = get(this, 'mapService.gridAttributes');
      const proposedEv = layer.containsArrayItems(results.proposedEv);
      const currentEv = layer.containsArrayItems(results.existingEv);

      for (let i = 0; i < get(results.grid, 'length'); i += 1) {
        const target = results.grid.objectAt(i);

        if (get(proposedEv, 'length')) {
          const doesContain = target.containsArrayItems(proposedEv);

          if (doesContain && get(doesContain, 'length')) {
            get(target, 'proposedEVStations').pushObjects(doesContain);
          }
        }

        if (get(currentEv, 'length')) {
          const doesContain = target.containsArrayItems(currentEv);

          if (doesContain && get(doesContain, 'length')) {
            get(target, 'currentEVStations').pushObjects(doesContain);
          }
        }
      }

      layer.rebuildLayer();

      return results;
    });
  },
});
