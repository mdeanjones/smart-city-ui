import Ember from 'ember';

const { Route, inject, get, RSVP, setProperties } = Ember;


export default Route.extend({
  mapService: inject.service('smart-city-maps'),

  ajax: inject.service(),


  // Load fixture data when the application first initializes.
  beforeModel() {
    const ajax = get(this, 'ajax');
    const store = get(this, 'mapService.store');

    return RSVP.hash({
      evLocations: ajax.request('/ev_station_locations'),
      chargingStations: ajax.request('/existing_charging_stations'),
      gasLocations: ajax.request('/gas_station_locations')
    }).then((results) => {
      setProperties(store, results);
    });
  },
});
