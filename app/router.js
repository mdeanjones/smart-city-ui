import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('maps', function() {
    this.route('charging-stations');
    this.route('demand-and-emissions');
  });

  this.route('dashboard', function() {});
});

export default Router;
