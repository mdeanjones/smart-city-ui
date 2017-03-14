/* global L */
import Ember from 'ember';

const { Component, get, set, computed, String: EmberString } = Ember;


export default Component.extend({
  attributeBindings: ['style'],

  height: '200px',

  map: null,


  style: computed('height', function() {
    return EmberString.htmlSafe(`height: ${get(this, 'height')};`);
  }).readOnly(),


  didInsertElement() {
    this._super(...arguments);

    const id = get(this, 'elementId');
    const map = L.map(id);

    set(this, 'map', map);

    this.sendAction('onMapReady', map, id);
  },


  willDestroyElement() {
    get(this, 'map').remove();
    this._super(...arguments);
  },
});
