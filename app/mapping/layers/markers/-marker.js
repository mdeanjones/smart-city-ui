/* global L */
import MapLayer from '../-map-layer';
import Ember from 'ember';

const {
  computed,
  get,
  getProperties,
} = Ember;


export default MapLayer.extend({
  coordinatesKey: 'coordinates',


  icon: computed(function() {
    return L.icon({});
  }).readOnly(),


  layer: computed('records.[]', function() {
    const {
      records,
      coordinatesKey,
      icon,
    } = getProperties(this, ['records', 'coordinatesKey', 'icon']);

    if (records && get(records, 'length')) {
      const items = [];

      records.forEach((item) => {
        items.push(this.createMarker(get(item, coordinatesKey), icon));
      });

      return L.layerGroup(items);
    }

    return null;
  }).readOnly(),


  createMarker(coordinates, icon) {
    return L.marker(coordinates, { icon });
  },
});
