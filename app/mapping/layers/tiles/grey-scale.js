/* global L */
import MapLayer from '../-map-layer';
import Ember from 'ember';

const {
  computed,
  get,
} = Ember;


export default MapLayer.extend({
  accessToken: null,

  layer: computed('accessToken', function() {
    const token = get(this, 'accessToken');

    if (token) {
      const url = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${token}`;

      return L.tileLayer(url, {
        id: 'mapbox.light',
        attribution: 'Map data &copy; ' +
        '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      });
    }

    return null;
  }).readOnly(),
});