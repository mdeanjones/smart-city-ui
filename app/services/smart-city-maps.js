/* global L */
import Ember from 'ember';

const { Service, get, set, computed, typeOf, inject } = Ember;


export default Service.extend({
  currentMap: null,

  ajax: inject.service(),

  maxActiveDataPoints: 4,

  currentActiveDataPoints: 0,

  currentDataPoint: 0,

  defaultCoordinates: {
    lat: 42.27,
    lng: -83.74,
  },

  defaultZoom: 13,

  accessToken: 'pk.eyJ1IjoiYmR1bGFuIiwiYSI6ImNpemZzOTYyYTAwbncycW5ueWYyaHkyeTkifQ.Iotxd_KBWcont6Hggmal1g',


  evStationLocations: computed(function() {
    return get(this, 'ajax').request('/ev_station_locations');
  }).readOnly(),


  existingStationLocation: computed(function() {
    return get(this, 'ajax').request('/existing_charging_stations');
  }).readOnly(),


  gasStationLocations: computed(function() {
    return get(this, 'ajax').request('/gas_station_locations');
  }).readOnly(),


  gasStationIcon: computed(function() {
    return L.icon({
      iconUrl: '/images/gas-station-map-icon.png',
      shadowUrl: '/images/gas-station-map-icon.png',
      iconSize: [30, 30],     // size of the icon
      shadowSize: [50, 64],   // size of the shadow
      iconAnchor: [22, 94],   // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76]  // point from which the popup should open relative to the iconAnchor
    });
  }).readOnly(),


  evStationIcon: computed(function () {
    return L.icon({
      iconUrl: '/images/ev-station-map-icon.png',
      shadowUrl: '/images/ev-station-map-icon.png',
      iconSize: [35, 35],     // size of the icon
      shadowSize: [50, 64],   // size of the shadow
      iconAnchor: [22, 94],   // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
  }).readOnly(),


  grayScaleLayer: computed(function() {
    const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=${get(this, 'accessToken')}`;

    return L.tileLayer(url, {
      attribution: 'Map data &copy; ' +
      '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    });
  }).readOnly(),





  setMap(map) {
    set(this, 'currentMap', map);
    return this;
  },


  setCenter(coords, map = null) {
    map = map || get(this, 'currentMap');

    if (map) {
      map.panTo(coords || get(this, 'defaultCoordinates'));
    }

    return this;
  },


  setZoom(zoom, map = null) {
    map = map || get(this, 'currentMap');

    if (map) {
      map.setZoom(zoom || get(this, 'defaultZoom'));
    }

    return this;
  },


  addLayer(layer, map = null) {
    map = map || get(this, 'currentMap');

    if (map) {
      if (typeOf(layer) === 'string') {
        layer = get(this, layer);

        if (layer) {
          map.addLayer(layer);
        }
      }
      else if (typeOf(layer) === 'array') {
        for (let i = 0; i < layer.length; i += 1) {
          this.addLayer(layer[i], id);
        }
      }
      else {
        map.addLayer(layer);
      }
    }

    return this;
  },
});
