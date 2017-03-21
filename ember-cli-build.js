/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'bower_components/bootstrap-sass/assets/stylesheets',
      ]
    },

    fingerprint: {
      exclude: ['assets/images/'],
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('bower_components/leaflet/dist/leaflet.css');
  app.import('bower_components/leaflet/dist/leaflet.js');

  app.import('bower_components/leaflet.markercluster/dist/leaflet.markercluster.js');
  app.import('bower_components/leaflet.markercluster/dist/MarkerCluster.css');
  app.import('bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css');

  app.import('bower_components/bootstrap-toggle/css/bootstrap-toggle.css');
  app.import('bower_components/bootstrap-toggle/js/bootstrap-toggle.js');

  app.import('bower_components/leaflet/dist/images/layers.png', { destDir: 'assets/images' });
  app.import('bower_components/leaflet/dist/images/layers-2x.png', { destDir: 'assets/images' });
  app.import('bower_components/leaflet/dist/images/marker-icon.png', { destDir: 'assets/images' });
  app.import('bower_components/leaflet/dist/images/marker-icon-2x.png', { destDir: 'assets/images' });
  app.import('bower_components/leaflet/dist/images/marker-shadow.png', { destDir: 'assets/images' });

  return app.toTree();
};