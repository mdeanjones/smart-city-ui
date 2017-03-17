/* global L */
import Marker from './-marker';
import Ember from 'ember';


const {
  computed,
} = Ember;


export default Marker.extend({
  icon: computed(function() {
    return L.icon({
      iconUrl: '/assets/images/icon_bus.png',
      // shadowUrl: '/assets/images/icon_fastcharge.png',
      iconSize: [30, 30],        // size of the icon
      // shadowSize: [50, 64],   // size of the shadow
      // iconAnchor: [22, 94],   // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      // popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
  }).readOnly(),
});
