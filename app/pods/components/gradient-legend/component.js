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

  reverse: false,

  colors: [],

  styles: computed('colors.@each', 'reverse', function() {
    const colors = get(this, 'colors');
    const string = (get(this, 'reverse') ? colors.slice().reverse() : colors).join(', ');

    return EmberString.htmlSafe(`background: linear-gradient(to right, ${string})`);
  }).readOnly(),
});
