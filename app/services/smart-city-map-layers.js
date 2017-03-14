/* global L */
import Ember from 'ember';

const { Service, get, computed, inject } = Ember;


export default Service.extend({
  store: inject.service('smart-city-dataset'),

  icons: inject.service('smart-city-map-icons'),

  accessToken: null,


  grayScaleLayer: computed(function() {
    const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=${get(this, 'accessToken')}`;

    return L.tileLayer(url, {
      attribution: 'Map data &copy; ' +
      '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    });
  }).readOnly(),


  gasLocationLayer: computed('store.gasLocations', 'icons.gasStationIcon', function() {
    const set = get(this, 'store.gasLocations');
    const icon = get(this, 'icons.gasLocationIcon');
    const items = [];

    for (let i = 0; i < set.length; i += 1) {
      items.push(L.marker([parseFloat(set[i].lat), parseFloat(set[i].long)], { icon }));
    }

    return L.layerGroup(items);
  }).readOnly(),


  evLocationLayer: computed('store.evLocations', 'icons.evLocationIcon', function() {
    const set = get(this, 'store.evLocations');
    const icon = get(this, 'icons.evLocationIcon');
    const items = [];

    for (let i = 0; i < set.length; i += 1) {
      items.push(L.marker([parseFloat(set[i].lat), parseFloat(set[i].long)], { icon }))
    }

    return L.layerGroup(items);
  }).readOnly(),
});
