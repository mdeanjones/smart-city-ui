import Ember from 'ember';

const {
  Component,
  computed,
  typeOf,
  get,
} = Ember;


export default Component.extend({
  classNames: ['dropdown-menu'],

  classNameBindings: ['rightAlign:dropdown-menu-right'],

  attributeBindings: ['ariaLabelledBy:aria-labelledby'],

  ariaLabelledBy: null,

  align: 'left',


  rightAlign: computed('align', function() {
    const align = get(this, 'align');

    if (typeOf(align) === 'string') {
      return align.toLowerCase() === 'right';
    }

    return false;
  }).readOnly(),
});
