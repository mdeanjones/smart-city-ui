import Ember from 'ember';

const { Service, inject, RSVP, get, setProperties } = Ember;


export default Service.extend({
  ajax: inject.service(),

  gasLocations: null,

  proposedEvLocations: null,

  currentEvLocations: null,

  gridAttributes: null,

  zoneClassCords: null,


  load() {
    const ajax = get(this, 'ajax');

    return RSVP.hash({
      proposedEvLocations: ajax.request('/ev_station_locations'),
      currentEvLocations: ajax.request('/existing_charging_stations'),
      gasLocations: ajax.request('/gas_station_locations'),
      gridAttributes: ajax.request('/grid_attributes'),
      zoneClassCords: ajax.request('/zone_class_cords'),
    }).then((results) => {
      setProperties(this, results);
    });
  },
});
