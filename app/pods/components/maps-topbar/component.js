import Ember from 'ember';
import moment from 'moment';

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

  // 5 minute increments across 24 hrs
  timeRange: [0, 287],

  timeRangeIntervalId: null,

  timeRangeTickCounter: null,

  timeRangeTickDuration: 1000,

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


  isTimeRangeDisabled: computed('isPlaying', 'sweepActive', function() {
    return get(this, 'isPlaying') && get(this, 'sweepActive');
  }),


  formattedTimeRangeStart: computed('timeRange.@each', function() {
    const range = get(this, 'timeRange');
    const time = moment('00:00', 'hh:mm').add(range[0] * 5, 'm');

    return time.format('hh:mma');
  }),


  formattedTimeRangeEnd: computed('timeRange.@each', function() {
    const range = get(this, 'timeRange');
    const time = moment('00:00', 'hh:mm').add(range[1] * 5, 'm');

    return time.format('hh:mma');
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
      const range = get(this, 'timeRange');
      const max = range[1] - range[0];

      const ticker = () => {
        const tickCount = get(this, 'timeRangeTickCounter');
        const newRange = [range[0] + tickCount, range[1]];

        set(this, 'timeRange', newRange);

        if (tickCount === max) {
          this.send('onPauseClick');
        }

        this.incrementProperty('timeRangeTickCounter');
      };

      setProperties(this, {
        isPlaying: true,
        isPaused: false,
        timeRangeIntervalId: setInterval(ticker, get(this, 'timeRangeTickDuration')),
        timeRangeTickCounter: 0,
      });

      ticker();
    },


    onPauseClick() {
      clearInterval(get(this, 'timeRangeIntervalId'));

      setProperties(this, {
        isPlaying: false,
        isPaused: true,
        timeRangeIntervalId: null,
        timeRangeTickCounter: null,
      });
    },
  },


  willDestroyElement() {
    const intervalId = get(this, 'timeRangeIntervalId');

    if (intervalId) {
      clearInterval(intervalId);
    }

    this._super(...arguments);
  },
});