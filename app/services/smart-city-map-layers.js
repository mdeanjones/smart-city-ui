/* global L */
import Ember from 'ember';

const { Service, get, computed, inject } = Ember;


export default Service.extend({
  store: inject.service('store'),

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
    const records = get(this, 'store').peekAll('gas-station-location');
    return this._buildMarkerLayerGroup(records, get(this, 'icons.gasLocationIcon'));
  }).readOnly(),


  proposedEvLocationLayer: computed(function() {
    const records = get(this, 'store').peekAll('ev-station-location');
    return this._buildMarkerLayerGroup(records, get(this, 'icons.proposedEvLocationIcon'));
  }).readOnly(),


  currentEvLocationLayer: computed(function() {
    const records = get(this, 'store').peekAll('existing-charging-station');
    return this._buildMarkerLayerGroup(records, get(this, 'icons.currentEvLocationIcon'));
  }).readOnly(),


  agricultureZoneLayer: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isAgricultureZone');
    return this._buildRectangleLayerGroup(records, '#66FF00');
  }).readOnly(),


  commercialZoneLayer: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isCommercialZone');
    return this._buildRectangleLayerGroup(records, '#FFCC00');
  }).readOnly(),


  downtownZoneLayer: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isDowntownZone');
    return this._buildRectangleLayerGroup(records, '#0099FF');
  }).readOnly(),


  industrialZoneLayer: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isIndustrialZone');
    return this._buildRectangleLayerGroup(records, '#666');
  }).readOnly(),


  parkingZoneLayer: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isParkingZone');
    return this._buildRectangleLayerGroup(records, '#800080');
  }).readOnly(),


  publicLandZoneLayer: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isPublicLandZone');
    return this._buildRectangleLayerGroup(records, '#33CC00');
  }).readOnly(),


  residentialSingleZoneLayer: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isResidentialSingleZone');
    return this._buildRectangleLayerGroup(records, '#FF0000');
  }).readOnly(),


  residentialMultiZoneLayer: computed(function() {
    const records = get(this, 'store').peekAll('zone-class-cord').filterBy('isResidentialMultiZone');
    return this._buildRectangleLayerGroup(records, '#FF0000', [5, 5]);
  }).readOnly(),


  _buildMarkerLayerGroup(records, icon) {
    const items = [];

    records.forEach((item) => {
      items.push(L.marker(get(item, 'coordinates'), { icon }));
    });

    return L.layerGroup(items);
  },


  _buildRectangleLayerGroup(records, fillColor, strokeDashArray = null) {
    const items = [];

    records.forEach((item) => {
      items.push(L.rectangle(get(item, 'bounds'), { color: fillColor, weight: 1, dashArray: strokeDashArray }));
    });

    return L.layerGroup(items);
  },
});
