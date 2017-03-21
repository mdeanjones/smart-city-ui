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
    const zones = [];


    if (get(record, 'agricultureRollupValue')) {
      zones.push('Agriculture');
    }

    if (get(record, 'commercialRollupValue')) {
      zones.push('Commercial');
    }

    if (get(record, 'downtownRollupValue')) {
      zones.push('Downtown');
    }

    if (get(record, 'industrialRollupValue')) {
      zones.push('Industrial');
    }

    if (get(record, 'parkingRollupValue')) {
      zones.push('Parking');
    }

    if (get(record, 'publicLandRollupValue')) {
      zones.push('Public Land');
    }

    if (get(record, 'residentialSingleRollupValue')) {
      zones.push('Residential Single Family');
    }

    if (get(record, 'residentialMultiRollupValue')) {
      zones.push('Residential Multi-family');
    }


    const content = `
        <p class="features-title">Cell Name/Number</p>
        <hr class="rule">
        <p class="heading">Features:</p>
        
        <table class="features-table">
            <tbody>
                <tr>
                    <td><strong>${get(record, 'proposedEVStations.length')}</strong></td>
                    <td>Proposed Charging Stations</td>
                </tr>
                <tr>
                    <td><strong>${get(record, 'currentEVStations.length')}</strong></td>
                    <td>Existing Charging Stations</td>
                </tr>
                <tr>
                    <td><strong>${get(record, 'gasStations')}</strong></td>
                    <td>Gas Stations</td>
                </tr>
                <tr>
                    <td><strong>${get(record, 'busStops')}</strong></td>
                    <td>Bus Stops</td>
                </tr>
                <tr>
                    <td><strong>${get(record, 'schools')}</strong></td>
                    <td>Schools</td>
                </tr>
                <tr>
                    <td><strong>${get(record, 'isPark')}</strong></td>
                    <td>Parks</td>
                </tr>
            </tbody>
        </table>
        
        <p class="heading">Zones:</p>
        <p class="zones-list">${zones.join(', ')}</p>
    `;

    popup.setContent(content);

    return popup;
  },
});
