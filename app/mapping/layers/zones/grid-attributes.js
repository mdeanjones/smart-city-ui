/* global L */
import Zone from './-zone';
import Ember from 'ember';


const { get } = Ember;


export default Zone.extend({
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
    const popup = L.popup({ maxWidth: 170 });

    const content = `
        <span class="text-muted">Features:</span>
        <br />
        <ul class="list-unstyled">
            <li><strong>${get(record, 'gasStations')}</strong> Gas Stations</li>
            <li><strong>${get(record, 'busStops')}</strong> Bus Stops</li>
            <li><strong>${get(record, 'schools')}</strong> Schools</li>
            <li><strong>${get(record, 'isPark')}</strong> Parks</li>
        </ul>
    `;

    popup.setContent(content);
    rectangle.bindPopup(popup);

    return rectangle;
  },
});
