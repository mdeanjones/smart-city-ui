/* global L */
import Rectangle from './-rectangle';
import Ember from 'ember';


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


  scoreColorPolygonProperties: {
    score1: {
      fillColor: '#ce0e00',
      fillOpacity: 0.5,
    },

    score2: {
      fillColor: '#ca4b00',
      fillOpacity: 0.5,
    },

    score3: {
      fillColor: '#c68500',
      fillOpacity: 0.5,
    },

    score4: {
      fillColor: '#c2bd00',
      fillOpacity: 0.5,
    },

    score5: {
      fillColor: '#8bbf00',
      fillOpacity: 0.5,
    },

    score6: {
      fillColor: '#19c600',
      fillOpacity: 0.5,
    },
  },


  showScoreColorObserver: observer('showScoreColors', function() {
    const showScoreColors = get(this, 'showScoreColors');
    const layer = get(this, 'layer');

    if (showScoreColors) {
      const styles = get(this, 'scoreColorPolygonProperties');

      layer.getLayers().forEach((layer) => {
        const score = get(layer, 'smartCityData.score');

        if (score > 0 && score < 7) {
          layer.setStyle(get(styles, `score${score}`));
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
