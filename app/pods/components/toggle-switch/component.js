import Ember from 'ember';

const {
  Component,
  computed,
  get,
  getProperties,
  observer,
} = Ember;


const Toggle =  Component.extend({
  classNameBindings: ['disabled'],

  isChecked: false,

  on: 'On',

  off: 'Off',

  size: 'normal',

  onstyle: 'primary',

  offstyle: 'default',

  style: '',

  width: null,

  height: null,

  onValue: null,

  offValue: null,

  disabled: false,


  checkboxId: computed('elementId', function() {
    return `${get(this, 'elementId')}-checkbox`;
  }).readOnly(),


  targetElement: computed('checkboxId', function() {
    return this.$(`#${get(this, 'checkboxId')}`);
  }).readOnly(),


  isCheckedObserver: observer('isChecked', function() {
    const isChecked = get(this, 'isChecked');
    const value = get(this, isChecked ? 'onValue' : 'offValue');

    this.sendAction('onChange', isChecked, value);
  }),


  didInsertElement() {
    this._super(...arguments);

    get(this, 'targetElement').bootstrapToggle(
      getProperties(this, ['on', 'off', 'size', 'onstyle', 'offstyle', 'style', 'width', 'height'])
    );
  },


  willDestroyElement() {
    get(this, 'targetElement').bootstrapToggle('destroy');
    this._super(...arguments);
  },
});


export default Toggle;
