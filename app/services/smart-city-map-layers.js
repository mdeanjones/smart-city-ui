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
    return this._buildLayerGroup(get(this, 'store.gasLocations'), get(this, 'icons.gasLocationIcon'));
  }).readOnly(),


  proposedEvLocationLayer: computed('store.proposedEvLocations', 'icons.proposedEvLocationIcon', function() {
    return this._buildLayerGroup(get(this, 'store.proposedEvLocations'), get(this, 'icons.proposedEvLocationIcon'));
  }).readOnly(),


  currentEvLocationLayer: computed('store.currentEvLocations', 'icons.currentEvLocationIcon', function() {
    return this._buildLayerGroup(get(this, 'store.currentEvLocations'), get(this, 'icons.currentEvLocationIcon'));
  }).readOnly(),


  _buildLayerGroup(latLongArray, icon) {
    const items = [];

    for (let i = 0; i < latLongArray.length; i += 1) {
      items.push(L.marker([parseFloat(latLongArray[i].lat), parseFloat(latLongArray[i].long)], { icon }));
    }

    return L.layerGroup(items);
  },
});
