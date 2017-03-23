import Ember from 'ember';

const {
  Component,
  get,
} = Ember;


export default Component.extend({
  tagName: 'span',

  attributeBindings: ['title'],

  title: null,

  maxWidth: 400,

  minWidth: null,

  arrow: false,

  interactive: true,

  side: 'top',

  tipTrigger: 'hover',


  didInsertElement() {
    this._super(...arguments);
    this.$().tooltipster({
      theme: ['tooltipster-light', 'tooltip-sc-light'],
      maxWidth: get(this, 'maxWidth'),
      minWidth: get(this, 'minWidth'),
      arrow: get(this, 'arrow'),
      interactive: get(this, 'interactive'),
      side: get(this, 'side'),
      trigger: get(this, 'tipTrigger'),
    });
  },


  willDestroyElement() {
    this.$().tooltipster('destroy');
    this._super(...arguments);
  },
});
