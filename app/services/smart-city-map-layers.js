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


  gasLocationLayer: computed(function() {
    return this._buildMarkerLayerGroup(get(this, 'store.gasLocations'), get(this, 'icons.gasLocationIcon'));
  }).readOnly(),


  proposedEvLocationLayer: computed(function() {
    return this._buildMarkerLayerGroup(get(this, 'store.proposedEvLocations'), get(this, 'icons.proposedEvLocationIcon'));
  }).readOnly(),


  currentEvLocationLayer: computed(function() {
    return this._buildMarkerLayerGroup(get(this, 'store.currentEvLocations'), get(this, 'icons.currentEvLocationIcon'));
  }).readOnly(),


  agricultureZoneLayer: computed(function() {
    const store = get(this, 'store');
    const type = get(store, 'zoneConstants.agriculture');

    return this._buildRectangleLayerGroup(store.getZonesByType(type), '#66FF00');
  }).readOnly(),


  commercialZoneLayer: computed(function() {
    const store = get(this, 'store');
    const type = get(store, 'zoneConstants.commercial');

    return this._buildRectangleLayerGroup(store.getZonesByType(type), '#FFCC00');
  }).readOnly(),


  downtownZoneLayer: computed(function() {
    const store = get(this, 'store');
    const type = get(store, 'zoneConstants.downtown');

    return this._buildRectangleLayerGroup(store.getZonesByType(type), '#0099FF');
  }).readOnly(),


  industrialZoneLayer: computed(function() {
    const store = get(this, 'store');
    const type = get(store, 'zoneConstants.industrial');

    return this._buildRectangleLayerGroup(store.getZonesByType(type), '#666');
  }).readOnly(),


  parkingZoneLayer: computed(function() {
    const store = get(this, 'store');
    const type = get(store, 'zoneConstants.parking');

    return this._buildRectangleLayerGroup(store.getZonesByType(type), '#800080');
  }).readOnly(),


  publicLandZoneLayer: computed(function() {
    const store = get(this, 'store');
    const type = get(store, 'zoneConstants.publicLand');

    return this._buildRectangleLayerGroup(store.getZonesByType(type), '#33CC00');
  }).readOnly(),


  residentialSingleZoneLayer: computed(function() {
    const store = get(this, 'store');
    const type = get(store, 'zoneConstants.residentialSingle');

    return this._buildRectangleLayerGroup(store.getZonesByType(type), '#FF0000');
  }).readOnly(),


  residentialMultiZoneLayer: computed(function() {
    const store = get(this, 'store');
    const type = get(store, 'zoneConstants.residentialMulti');

    return this._buildRectangleLayerGroup(store.getZonesByType(type), '#FF0000', [5, 5]);
  }).readOnly(),


  _buildMarkerLayerGroup(latLongArray, icon) {
    const items = [];

    for (let i = 0; i < latLongArray.length; i += 1) {
      items.push(L.marker([parseFloat(latLongArray[i].lat), parseFloat(latLongArray[i].long)], { icon }));
    }

    return L.layerGroup(items);
  },


  _buildRectangleLayerGroup(latLongArray, fillColor, strokeDashArray = null) {
    const items = [];

    for (let i = 0; i < latLongArray.length; i += 1) {
      const item = latLongArray[i];
      const bounds = [[parseFloat(item.lat1), parseFloat(item.long1)], [parseFloat(item.lat2), parseFloat(item.long2)]];

      items.push(L.rectangle(bounds, { color: fillColor, weight: 1, dashArray: strokeDashArray }));
    }

    return L.layerGroup(items);
  },
});
