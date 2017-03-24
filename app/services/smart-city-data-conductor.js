import Ember from 'ember';
import ENV from 'smart-city-ui/config/environment';

const {
  Service,
  inject,
  computed,
  get,
  observer,
  set,
  setProperties,
  RSVP : {
    resolve,
  },
  run: {
    debounce,
  },
} = Ember;


export default Service.extend({
  ajax: inject.service(),

  isLoading: false,

  // 5 minute increments across 24 hrs
  timeRange: [0, 287],

  timeRangeIntervalId: null,

  timeRangeTickCounter: null,

  timeRangeTickDuration: 1000,

  evPercentageInFleet: 2,

  chargeRemaining: 50,

  demandActive: true,

  emissionsActive: computed.not('demandActive'),

  evActive: true,

  icActive: computed.not('evActive'),

  aggregateActive: true,

  sweepActive: computed.not('aggregateActive'),

  isPaused: true,

  isPlaying: computed.not('isPaused'),

  dayOfWeek: 'mon',


  changeWatcher: observer('dayOfWeek,evPercentageInFleet,demandActive', function() {
    debounce(this, 'changeDataSet', 250);
  }),


  cache: {},


  changeDataSet() {
    const day = get(this, 'dayOfWeek');
    const sample = get(this, 'evPercentageInFleet');
    const metric = get(this, 'demandActive') ? 'perc_ee' : 'co2_em';

    this.loadDataSet(day, sample, metric);
  },


  loadDataSet(day, sample, metric) {
    const keyChain = `cache.${day}.p${sample}.${metric}`;
    const cached = get(this, keyChain);

    if (cached) {
      return resolve(cached);
    }
    else {
      const url = `${ENV.rootURL}${day}/p${sample}/${metric}.json`;

      console.log(url);

      // return get(this, 'ajax').request(url).then((results) => {
      //  set(this, keyChain, results);
      //  return results;
      // });
    }
  },


  playTimeRange() {
    if (get(this, 'timeRangeIntervalId')) {
      return;
    }

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
      isPaused: false,
      timeRangeIntervalId: setInterval(ticker, get(this, 'timeRangeTickDuration')),
      timeRangeTickCounter: 0,
    });

    ticker();
  },


  pauseTimeRange() {
    const intervalId = get(this, 'timeRangeIntervalId');

    if (!intervalId) {
      return;
    }

    clearInterval(intervalId);

    setProperties(this, {
      isPaused: true,
      timeRangeIntervalId: null,
      timeRangeTickCounter: null,
    });
  },
});
