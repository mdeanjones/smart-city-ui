import Ember from 'ember';
import ENV from 'smart-city-ui/config/environment';
import StatUtils from 'smart-city-ui/utils/stat-utils';


const {
  Service,
  inject,
  computed,
  get,
  getProperties,
  observer,
  set,
  setProperties,
  typeOf,
  RSVP : {
    resolve,
  },
  run: {
    debounce,
  },
} = Ember;


export default Service.extend({
  ajax: inject.service(),

  mapService: inject.service('smart-city-maps'),

  isLoading: false,

  // 5 minute increments across 24 hrs
  timeRange: [0, 287],

  timeRangeIntervalId: null,

  timeRangeTickCounter: null,

  timeRangeTickDuration: 250,

  evPercentageInFleet: 2,

  chargeRemaining: 100,

  demandActive: true,

  emissionsActive: computed.not('demandActive'),

  evActive: true,

  icActive: computed.not('evActive'),

  aggregateActive: true,

  sweepActive: computed.not('aggregateActive'),

  isPaused: true,

  isPlaying: computed.not('isPaused'),

  dayOfWeek: 'mon',

  cache: {},


  // Generates a URL to the JSON file needed to render the heat map based on current settings.
  requestedDataUrl: computed('dayOfWeek,evPercentageInFleet,demandActive', function() {
    const day = get(this, 'dayOfWeek');
    const sample = get(this, 'evPercentageInFleet');
    const metric = get(this, 'demandActive') ? 'perc_ee' : 'co2_em';

    return `${ENV.rootURL}grid-data/${day}/p${sample}/${metric}.json`;
  }),


  // Does the
  isRequestedDataCached: computed('requestedDataUrl', function() {
    return !!this.getFromCache(get(this, 'requestedDataUrl'));
  }),


  // An observer who watches the property values that when changed might require a fresh
  // AJAX call. If an AJAX call is going to be required, then the execution is debounced
  // so we don't wind up spamming the server.
  cacheUpdateRequiredWatcher: observer('dayOfWeek,evPercentageInFleet,demandActive,isRequestedDataCached', function() {
    if (get(this, 'isRequestedDataCached')) {
      this.computeFromCurrentSettings();
    }
    else {
      debounce(this, 'computeFromCurrentSettings', 250);
    }
  }),


  // An observer who watches property values that when changes will require the active data
  // set to be recomputed for the map. No AJAX calls required here.
  recomputeRequiredWatcher: observer('timeRange.@each,chargeRemaining,aggregateActive', function() {
    this.computeFromCurrentSettings();
  }),


  // Retrieves an already loaded data set from the cache. A key can be provided,
  // or the current requestedDataUrl key will be used. Returns undefined if nothing
  // is stored in the cache under the provided key.
  getFromCache(key = null) {
    key = key || get(this, 'requestedDataUrl');
    return get(this, 'cache')[key];
  },


  addToCache(key, value) {
    get(this, 'cache')[key] = value;
  },


  computeFromCurrentSettings() {
    this.getDataSet().then((data) => {
      get(this, 'mapService.gridCells').updateHeatMap(
        this.processDataSet(data)
      );
    });
  },


  getDataSet(key = null) {
    key = key || get(this, 'requestedDataUrl');
    const cacheItem = this.getFromCache(key);

    if (!!cacheItem) {
      return resolve(cacheItem);
    }
    else {
      set(this, 'isLoading', true);

      return get(this, 'ajax').request(key).then((data) => {
        this.addToCache(key, data);
        set(this, 'isLoading', false);

        return data;
      });
    }
  },


  processDataSet(dataSet) {
    const {
      timeRange,
      chargeRemaining,
      demandActive,
      aggregateActive,
    } = getProperties(this, ['timeRange', 'chargeRemaining', 'demandActive', 'aggregateActive']);

    let timeSlice = null;

    if (aggregateActive) {
      timeSlice = dataSet.map((item) => {
        let subset = item.t.slice(timeRange[0], (timeRange[1] + 1));

        if (demandActive) {
          subset = subset.filter((perc) => perc < chargeRemaining / 100);
        }

        return StatUtils.getMean(subset);
      });
    }
    else {
      timeSlice = dataSet.map(item => item.t[timeRange[0]]);
    }

    const deciles = StatUtils.getDeciles(timeSlice);
    const ranks = timeSlice.map(item => StatUtils.decileRank(deciles, item));

    return timeSlice.map((item, idx) => {
      return {
        mean: item,
        percentile: ranks[idx],
      };
    });
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
        this.pauseTimeRange();
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
