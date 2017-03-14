/* global L */
import Ember from 'ember';

const { Service, computed } = Ember;


export default Service.extend({
  gasLocationIcon: computed(function() {
    return L.icon({
      iconUrl: '/assets/images/gas-station-map-icon.png',
      shadowUrl: '/assets/images/gas-station-map-icon.png',
      iconSize: [30, 30],     // size of the icon
      shadowSize: [50, 64],   // size of the shadow
      iconAnchor: [22, 94],   // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76]  // point from which the popup should open relative to the iconAnchor
    });
  }).readOnly(),


  evLocationIcon: computed(function () {
    return L.icon({
      iconUrl: '/assets/images/ev-station-map-icon.png',
      shadowUrl: '/assets/images/ev-station-map-icon.png',
      iconSize: [35, 35],     // size of the icon
      shadowSize: [50, 64],   // size of the shadow
      iconAnchor: [22, 94],   // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
  }).readOnly(),
});
