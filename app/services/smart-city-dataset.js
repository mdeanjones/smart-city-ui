import Ember from 'ember';

const { Service, inject, RSVP, get, setProperties } = Ember;

const ZONE_RESIDENTIAL_SINGLE_FAMILY = 'Residental_Single_Family';
const ZONE_RESIDENTIAL_MULTI_FAMILY = 'Residental_Multiple_Family';
const ZONE_COMMERCIAL = 'Commercial';
const ZONE_PARKING = 'Parking';
const ZONE_DOWNTOWN = 'Downtown';
const ZONE_INDUSTRIAL = 'Industrial';
const ZONE_AGRICULTURE = 'Agriculture';
const ZONE_PUBLIC_LAND = 'Public_Land';


export default Service.extend({
  ajax: inject.service(),

  zoneConstants: {
    residentialSingle: ZONE_RESIDENTIAL_SINGLE_FAMILY,
    residentialMulti: ZONE_RESIDENTIAL_MULTI_FAMILY,
    commercial: ZONE_COMMERCIAL,
    parking: ZONE_PARKING,
    downtown: ZONE_DOWNTOWN,
    industrial: ZONE_INDUSTRIAL,
    agriculture: ZONE_AGRICULTURE,
    publicLand: ZONE_PUBLIC_LAND,
  },

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


  getZonesByType(type) {
    return get(this, 'zoneClassCords').filter(item => get(item, 'zone') === type);
  },
});
