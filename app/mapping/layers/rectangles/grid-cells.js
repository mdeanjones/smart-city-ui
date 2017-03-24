/* global L */
import Rectangle from './-rectangle';
import Ember from 'ember';
import ColorUtils from 'smart-city-ui/utils/color-utils';

const {
  get,
  observer,
  setProperties,
  getProperties,
  computed,
} = Ember;


export default Rectangle.extend({
  scoreColorsEnabled: true,

  scoreColorsDisabled: computed.not('scoreColorsEnabled'),

  showScoreColors: false,

  isVisible: true,

  defaultVisibility: true,

  heatMapping: false,

  scoreColors: ColorUtils.getColorPalette('#ce0e00', '#19c600', [0.2, 0.4, 0.6, 0.8]),

  heatMapColors: ColorUtils.getColorPalette('#ff0000', '#0000ff', [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]),

  polygonProperties: {
    color: '#000',
    weight: 1,
    opacity: 0.3,
    fillOpacity: 0,
  },


  showScoreColorObserver: observer('showScoreColors', function() {
    this.paintGridCells();
  }),


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


  enableHeatMap(dataSet) {
    setProperties(this, {
      scoreColorsEnabled: false,
      showScoreColors: false,
      heatMapping: true,
    });

    this.updateHeatMap(dataSet);
  },


  updateHeatMap(dataSet) {
    this.paintGridCells(dataSet);
  },


  disableHeatMap() {
    setProperties(this, {
      scoreColorsEnabled: true,
      heatMapping: false,
    });

    this.paintGridCells();
  },


  paintGridCells(dataSet = null) {
    const {
      scoreColorsEnabled,
      showScoreColors,
      heatMapping,
      layer,
    } = getProperties(this, ['scoreColorsEnabled', 'showScoreColors', 'heatMapping', 'layer']);

    if ((scoreColorsEnabled && showScoreColors) || (heatMapping && dataSet)) {
      const palette = heatMapping ? get(this, 'heatMapColors') : get(this, 'scoreColors');

      layer.getLayers().forEach((item, idx) => {
        if (heatMapping) {
          // item.getPopup().setContent(palette[dataSet[idx].percentile - 1]);
          item.setStyle({ fillColor: palette[dataSet[idx].percentile - 1], fillOpacity: 0.5 });
        }
        else {
          const score = get(item, 'smartCityData.score');
          item.setStyle({ fillColor: palette[score - 1], fillOpacity: 0.5 });
        }
      });
    }
    else {
      const defaults = get(this, 'polygonProperties');

      layer.getLayers().forEach((item) => {
        item.setStyle(defaults);
      });
    }
  },
});
