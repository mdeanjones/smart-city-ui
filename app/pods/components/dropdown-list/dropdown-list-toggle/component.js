import Ember from 'ember';

const {
  Component,
  computed,
  get,
} = Ember;


const Toggle = Component.extend({
  classNames: ['dropdown-toggle'],

  attributeBindings: ['ariaHasPopup:aria-haspopup', 'ariaExpanded:aria-expanded'],

  tagName: 'button',

  ariaRole: 'button',

  ariaHasPopup: true,

  text: null,

  isOpen: false,


  ariaExpanded: computed('isOpen', function() {
    return get(this, 'isOpen') ? 'true' : 'false';
  }).readOnly(),


  click(event) {
    event.stopPropagation();
    this.sendAction('toggleAction');
    return false;
  },
});

Toggle.reopenClass({
  positionalParams: ['text'],
});

export default Toggle;
