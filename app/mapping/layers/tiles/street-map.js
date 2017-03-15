/* global L */
import MapLayer from '../-map-layer';
import Ember from 'ember';

const {
  computed,
  get,
} = Ember;


export default MapLayer.extend({
  accessToken: null,

  defaultVisibility: true,

  isVisible: true,

  layer: computed('accessToken', function() {
    const token = get(this, 'accessToken');

    if (token) {
      const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=${token}`;

      return L.tileLayer(url, {
        attribution: 'Map data &copy; ' +
        '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      });
    }

    return null;
  }).readOnly(),
});