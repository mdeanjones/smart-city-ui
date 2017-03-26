import Ember from 'ember';

const {
  Controller,
  inject,
  get,
  set,
  setProperties,
} = Ember;


export default Controller.extend({
  mapService: inject.service('smart-city-maps'),

  mapLayersPaneVisible: false,

  mapAnalyticsPaneVisible: false,

  mapInfoPaneVisible: false,

  map: null,

  currentLat: 42.27,

  currentLng: -83.74,

  currentZoom: 13,

  actions: {
    mapReady(map) {
      get(this, 'mapService').updateTargetMap(map, 'greyScaleTiles');

      map.panTo([get(this, 'currentLat'), get(this, 'currentLng')]);
      map.setZoom(get(this, 'currentZoom'));

      map.zoomControl.setPosition('topright');

      map.on('move', () => {
        const latLng = map.getCenter();

        setProperties(this, {
          currentLat: latLng.lat,
          currentLng: latLng.lng,
        });
      });

      map.on('zoomend', () => {
        set(this, 'currentZoom', map.getZoom());
      });
    },


    toggleFlyoutMenu(name) {
      switch(name) {
        case 'layers':
          this.toggleProperty('mapLayersPaneVisible');
          break;

        case 'analytics':
          this.toggleProperty('mapAnalyticsPaneVisible');
          break;

        case 'mapinfo':
          this.toggleProperty('mapInfoPaneVisible');
          break;
      }
    },
  },
});