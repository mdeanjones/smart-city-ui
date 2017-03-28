import Ember from 'ember';

const {
  Component,
  computed,
  get,
  String: EmberString,
} = Ember;


export default Component.extend({
  classNames: ['gradient-legend'],

  attributeBindings: ['styles:style'],

  colors: [],

  styles: computed('colors.@each', function() {
    return EmberString.htmlSafe(`background: linear-gradient(to right, ${get(this, 'colors').join(', ')})`);
  }).readOnly(),
});
