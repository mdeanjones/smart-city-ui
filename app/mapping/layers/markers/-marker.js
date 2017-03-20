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

  cluster: false,


  clusterOptions: {},


  icon: computed(function() {
    return L.icon({});
  }).readOnly(),


  layer: computed('records.[]', function() {
    const {
      records,
      coordinatesKey,
      icon,
    } = getProperties(this, ['records', 'coordinatesKey', 'icon']);

    return this.createLayer(records, coordinatesKey, icon);
  }).readOnly(),


  createLayer(records, coordinatesKey, icon) {
    if (records && get(records, 'length')) {
      const cluster = get(this, 'cluster');
      const items = cluster ? L.markerClusterGroup(get(this, 'clusterOptions')) : [];

      records.forEach((item) => {
        const marker = this.createMarker(get(item, coordinatesKey), icon, item);

        if (cluster) {
          items.addLayer(marker);
        }
        else {
          items.push(marker);
        }
      });

      return cluster ? items : L.layerGroup(items);
    }

    return null;
  },


  createMarker(coordinates, icon) {
    return L.marker(coordinates, { icon });
  },


  getCustomIconCreateFunction(className) {
    return function (cluster) {
      const childCount = cluster.getChildCount();

      let c = ' marker-cluster-';

      if (childCount < 10) {
        c = `${c}small`;
      }
      else if (childCount < 100) {
        c = `${c}medium`;
      }
      else {
        c = `${c}large`;
      }

      if (className) {
        c += ` ${className}`;
      }

      return new L.DivIcon({
        html: '<div><span>' + childCount + '</span></div>',
        className: 'marker-cluster' + c,
        iconSize: new L.Point(40, 40)
      });
    };
  },
});
