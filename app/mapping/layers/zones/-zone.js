/* global L */
import MapLayer from '../-map-layer';
import Ember from 'ember';

const {
  computed,
  get,
  getProperties,
} = Ember;


export default MapLayer.extend({
  boundaryKey: 'bounds',

  polygonProperties: {
    color: '#ccc',
    weight: 1,
  },


  layer: computed('records.[]', function() {
    const {
      records,
      boundaryKey,
      polygonProperties,
    } = getProperties(this, ['records', 'boundaryKey', 'polygonProperties']);

    if (records && get(records, 'length')) {
      const items = [];

      records.forEach((item) => {
        items.push(this.createRectangle(get(item, boundaryKey), polygonProperties, item));
      });

      return L.featureGroup(items);
    }

    return null;
  }).readOnly(),


  createRectangle(bounds, polygonProperties) {
    return L.rectangle(bounds, polygonProperties);
  },


  rebuildLayer() {
    this.notifyPropertyChange('layer');
  },
});
