import Ember from 'ember';

const {
  Route,
  RSVP: {
    all,
  },
} = Ember;


export default Route.extend({
  // Load fixture data when the application first initializes.
  beforeModel() {
    return all([
      this.store.findAll('ev-station-location'),
      this.store.findAll('existing-charging-station'),
      this.store.findAll('gas-station-location'),
      this.store.findAll('bus-stop'),
      this.store.findAll('grid-attribute'),
      this.store.findAll('zone-class-cord'),
    ]);
  },
});
