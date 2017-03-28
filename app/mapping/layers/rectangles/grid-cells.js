/* global L */
import Rectangle from './-rectangle';
import Ember from 'ember';

const {
  get,
  typeOf,
} = Ember;


export default Rectangle.extend({
  isVisible: true,

  defaultVisibility: true,


  polygonProperties: {
    color: '#000',
    weight: 1,
    opacity: 0.3,
    fillOpacity: 0,
  },


  createRectangle(bounds, polygonProperties, record) {
    const rectangle = this._super(bounds, polygonProperties);

    rectangle.smartCityData = {
      recordId: get(record, 'id'),
      score: get(record, 'score'),
    };

    rectangle.on('popupopen', (e) => {
      e.target.setStyle({ opacity: 1 });
    });

    rectangle.on('popupclose', (e) => {
      e.target.setStyle({ opacity: 0.3 });
    });

    rectangle.bindPopup(this.createRectanglePopup(record));

    return rectangle;
  },


  createRectanglePopup(record) {
    const popup = L.popup({ maxWidth: 170 });
    popup.setContent(get(record, 'cellDetailsHtml'));

    return popup;
  },


  paintGridCells2x(instructSet, stylePalette, paletteMapKey = null /* , popupMapKey = null */) {
    const layer = get(this, 'layer');
    const defaults = get(this, 'polygonProperties');

    // If no instructSet has been provided then assume we want
    // to set all grid cells to their default.
    if (!instructSet) {
      layer.getLayers().forEach((childLayer) => {
        childLayer.setStyle(defaults);
      });

      return;
    }


    let paletteKeys = instructSet;

    // If `instructSet` is a string, assume it is informing us of
    // where to find the required palette index value on the layer
    // itself within the predefined `smartCityData` hash.
    if (typeOf(instructSet) === 'string') {
      paletteKeys = layer.getLayers().map(childLayer => get(childLayer, `smartCityData.${instructSet}`));
    }


    // If `paletteMapKey` is a string, then assume `instructSet` is
    // an array of hashes and `paletteMapKey` informs us of where
    // to find the required palette index value on each one.
    if (typeOf(paletteMapKey) === 'string') {
      paletteKeys = paletteKeys.map(item => get(item, paletteMapKey));
    }


    // Apply styles or defaults.
    layer.getLayers().forEach((childLayer, idx) => {
      if (paletteKeys[idx]) {
        childLayer.setStyle({ fillColor: stylePalette[paletteKeys[idx] - 1], fillOpacity: 0.5 });
      }
      else {
        childLayer.setStyle(defaults);
      }
    });
  },
});
