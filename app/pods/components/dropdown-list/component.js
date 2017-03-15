import Ember from 'ember';

const {
  Component,
  computed,
  get,
  set,
  $,
} = Ember;


export default Component.extend({
  classNames: ['dropdown'],

  classNameBindings: ['isOpen:open'],

  isOpen: false,

  closeOnInteraction: true,


  toggleId: computed('elementId', function() {
    return `${get(this, 'elementId')}-toggle`;
  }).readOnly(),


  actions: {
    toggleAction() {
      this.toggleProperty('isOpen');
    },
  },


  didInsertElement() {
    this._super(...arguments);

    $(document).on(`click.${get(this, 'elementId')}`, (event) => {
      if (get(this, 'closeOnInteraction') || !this.$().find(event.target).length) {
        set(this, 'isOpen', false);
      }
    });
  },


  willDestroyElement() {
    $(document).off(`click.${get(this, 'elementId')}`);
    this._super(...arguments);
  },
});
