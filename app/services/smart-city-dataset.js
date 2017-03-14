import Ember from 'ember';

const { Service, inject, RSVP, get, setProperties } = Ember;


export default Service.extend({
  ajax: inject.service(),

  gasLocations: null,

  evLocations: null,

  chargingStations: null,


  load() {
    const ajax = get(this, 'ajax');

    return RSVP.hash({
      evLocations: ajax.request('/ev_station_locations'),
      chargingStations: ajax.request('/existing_charging_stations'),
      gasLocations: ajax.request('/gas_station_locations')
    }).then((results) => {
      setProperties(this, results);
    });
  },
});
