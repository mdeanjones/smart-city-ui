import Ember from 'ember';

const {
  Component,
  computed,
  get,
  set,
  setProperties,
  typeOf,
} = Ember;


export default Component.extend({
  classNames: ['topbar'],

  mapService: null,

  defaultTimeRange: [0, 287],

  evPercentageInFleet: 2,

  chargeRemaining: 50,

  demandActive: true,

  emissionsActive: false,

  evActive: true,

  icActive: false,

  aggregateActive: true,

  sweepActive: false,

  isPlaying: false,

  isPaused: true,

  dayOfWeek: 'mon',


  evPercentageInFleetInt: computed('evPercentageInFleet', {
    get() {
      return get(this, 'evPercentageInFleet');
    },

    set(key, value) {
      value = typeOf(value) === 'string' ? parseInt(value) : value;

      set(this, 'evPercentageInFleet', value);
      return value;
    },
  }),


  chargeRemainingInt: computed('chargeRemaining', {
    get() {
      return get(this, 'chargeRemaining');
    },

    set(key, value) {
      value = typeOf(value) === 'string' ? parseInt(value) : value;

      set(this, 'chargeRemaining', value);
      return value;
    },
  }),


  isPlayDisabled: computed('isPlaying', 'aggregateActive', function() {
    return get(this, 'isPlaying') || get(this, 'aggregateActive');
  }),


  isPauseDisabled: computed('isPaused', 'aggregateActive', function() {
    return get(this, 'isPaused') || get(this, 'aggregateActive');
  }),


  actions: {
    onDemandOrEmissionsToggle(isDemand) {
      setProperties(this, {
        demandActive: isDemand,
        emissionsActive: !isDemand,
      });
    },


    onEvOrIcToggle(isEv) {
      setProperties(this, {
        evActive: isEv,
        icActive: !isEv,
      });
    },


    onAggregateOrSweepToggle(isAggregate) {
      setProperties(this, {
        aggregateActive: isAggregate,
        sweepActive: !isAggregate,
      });

      if (isAggregate) {
        this.send('onPauseClick');
      }
    },


    onPlayClick() {
      setProperties(this, {
        isPlaying: true,
        isPaused: false,
      });
    },


    onPauseClick() {
      setProperties(this, {
        isPlaying: false,
        isPaused: true,
      });
    },
  },
});