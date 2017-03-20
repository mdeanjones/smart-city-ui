/* global L */
import Zone from './-zone';
import Ember from 'ember';


const {
  get,
} = Ember;


export default Zone.extend({
  isVisible: true,

  defaultVisibility: true,

  polygonProperties: {
    color: '#000',
    weight: 1,
    opacity: 0.3,
    fillOpacity: 0,
  },


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
        <p class="features-heading">Features:</p>
        
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
        
        <p class="zones-heading">Zones:</p>
        <p class="zones-list">${zones.join(', ')}</p>
    `;

    popup.setContent(content);
    rectangle.bindPopup(popup);

    return rectangle;
  },
});
