/* global L */
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
      existingEv: this.store.findAll('existing-charging-station'),
      gasStations: this.store.findAll('gas-station-location'),
      busStops: this.store.findAll('bus-stop'),
      schools: this.store.findAll('school'),
      parks: this.store.findAll('park'),
      grid: this.store.findAll('grid-cell'),
      zones: this.store.findAll('zone-class-cord'),
    }).then((results) => {
      this.buildManualRelations(results);
      return results;
    });
  },


  buildManualRelations(results) {
    const bounds = L.latLngBounds();

    // This first step is to create a single bound that contains the whole
    // grid. It is much more efficient than checking each cell individually.
    results.grid.forEach((item) => {
      bounds.extend(get(item, 'latLngBounds'));
    });

    // Prune the existingEv coordinates to only those that appear somewhere
    // within the overall grid boundaries. These are the only items which
    // we need to further compare to individual grid cells, since we know
    // everything else falls outside any of them.
    const subset = results.existingEv.filter(item => bounds.contains(get(item, 'coordinates')));

    // Now we can start comparing the subset created above to single grid cells.
    // Each time one or more matches are made in a given cell, those records are
    // removed from the original matched set so we don't have to iterate any
    // further than needed.
    for (let i = 0; i < get(results.grid, 'length'); i += 1) {
      const cell = results.grid.objectAt(i);
      const cellSubset = subset.filter(item => get(cell, 'latLngBounds').contains(get(item, 'coordinates')));

      if (get(cellSubset, 'length')) {
        get(cell, 'currentEVStations').addObjects(cellSubset);
        subset.removeObjects(cellSubset);
      }

      if (get(subset, 'length') === 0) {
        break;
      }
    }
  },
});
