import Ember from 'ember';

const {
  Route,
  inject,
  get,
} = Ember;


export default Route.extend({
  gridDirector: inject.service('grid-director'),


  actions: {
    didTransition() {
      get(this, 'gridDirector').changeDrawType('metric');
    },
  },
});
