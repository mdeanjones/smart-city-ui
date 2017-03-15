import Ember from 'ember';

const { Service, get, set, typeOf, inject } = Ember;


export default Service.extend({
  currentMap: null,

  maxActiveDataPoints: 4,

  currentActiveDataPoints: 0,

  currentDataPoint: 0,

  defaultCoordinates: {
    lat: 42.27,
    lng: -83.74,
  },

  defaultZoom: 13,

  accessToken: 'pk.eyJ1IjoiYmR1bGFuIiwiYSI6ImNpemZzOTYyYTAwbncycW5ueWYyaHkyeTkifQ.Iotxd_KBWcont6Hggmal1g',

  store: inject.service('smart-city-dataset'),

  layers: inject.service('smart-city-map-layers'),

  icons: inject.service('smart-city-map-icons'),


  init() {
    this._super(...arguments);
    set(this, 'layers.accessToken', get(this, 'accessToken'));
  },


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
        layer = get(this, `layers.${layer}`);

        if (layer) {
          map.addLayer(layer);
        }
      }
      else if (typeOf(layer) === 'array') {
        for (let i = 0; i < layer.length; i += 1) {
          this.addLayer(layer[i], map);
        }
      }
      else {
        map.addLayer(layer);
      }
    }

    return this;
  },
});
