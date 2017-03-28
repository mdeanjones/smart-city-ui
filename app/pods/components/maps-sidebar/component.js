import Ember from 'ember';

const {
  Component,
} = Ember;


export default Component.extend({
  classNames: ['map-sidebar'],

  mapService: null,

  gridDirector: null,
});
