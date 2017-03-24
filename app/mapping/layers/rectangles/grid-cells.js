/* global L */
import Rectangle from './-rectangle';
import Ember from 'ember';
import ColorUtils from 'smart-city-ui/utils/color-utils';

const {
  get,
  observer,
} = Ember;


export default Rectangle.extend({
  showScoreColors: false,

  isVisible: true,

  defaultVisibility: true,

  polygonProperties: {
    color: '#000',
    weight: 1,
    opacity: 0.3,
    fillOpacity: 0,
  },

  scoreColors: ColorUtils.getColorPalette('#ce0e00', '#19c600', [0.2, 0.4, 0.6, 0.8]),


  showScoreColorObserver: observer('showScoreColors', function() {
    const showScoreColors = get(this, 'showScoreColors');
    const layer = get(this, 'layer');

    if (showScoreColors) {
      const styles = get(this, 'scoreColorPolygonProperties');

      layer.getLayers().forEach((layer) => {
        const score = get(layer, 'smartCityData.score');

        if (score > 0 && score < 7) {
          layer.setStyle({ fillColor: get(this, 'scoreColors')[score - 1], fillOpacity: 0.5 });
        }
      });
    }
    else {
      const defaultStyles = get(this, 'polygonProperties');

      layer.getLayers().forEach((layer) => {
        layer.setStyle(defaultStyles);
      });
    }
  }),


  containsArrayItems(input) {
    const bounds = get(this, 'layer').getBounds();
    const results = [];

    if (input && get(input, 'length')) {
      input.forEach((item) => {
        if (bounds.contains(get(item, 'coordinates'))) {
          results.push(item);
        }
      });
    }

    return results;
  },


  createRectangle(bounds, polygonProperties, record) {
    const rectangle = this._super(bounds, polygonProperties);

    rectangle.smartCityData = {
      recordId: get(record, 'id'),
      score: get(record, 'score'),
    };

    rectangle.bindPopup(this.createRectanglePopup(record));
    return rectangle;
  },


  createRectanglePopup(record) {
    const popup = L.popup({ maxWidth: 170 });
    popup.setContent(get(record, 'cellDetailsHtml'));

    return popup;
  },
});
