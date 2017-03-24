import Ember from 'ember';
import ENV from 'smart-city-ui/config/environment';
import StatUtils from 'smart-city-ui/utils/stat-utils';


const {
  Service,
  inject,
  computed,
  get,
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

  activeDataSet: null,

  cache: {},


  changeWatcher: observer('dayOfWeek,evPercentageInFleet,demandActive,timeRange.@each', function() {
    debounce(this, 'changeDataSet', 250);
  }),


  changeDataSet() {
    const range = get(this, 'timeRange');
    const day = get(this, 'dayOfWeek');
    const sample = get(this, 'evPercentageInFleet');
    const metric = get(this, 'demandActive') ? 'perc_ee' : 'co2_em';

    return this.loadDataSet(day, sample, metric).then((data) => {
      data = this.processDataSet(data, range);

      // console.log(data);
      // set(this, 'activeDataSet', data);
    });
  },


  loadDataSet(day, sample, metric) {
    const url = `${ENV.rootURL}grid-data/${day}/p${sample}/${metric}.json`;
    const cached = get(this, 'cache')[url];

    if (cached) {
      return resolve(cached);
    }
    else {
      set(this, 'loading', true);

      return get(this, 'ajax').request(url).then((data) => {
        get(this, 'cache')[url] = data;
        set(this, 'loading', false);

        return data;
      });
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


  processDataSet(dataSet, limits = null) {
    const means = dataSet.map((item) => {
      let temp = item.t;

      if (limits) {
        temp = item.t.slice(limits[0], (limits[1] + 1));
      }

      return StatUtils.getMean(temp);
    });

    const deciles = StatUtils.getDeciles(means);
    const ranks = means.map(item => StatUtils.decileRank(deciles, item));

    return means.map((item, idx) => {
      return {
        mean: item,
        percentile: ranks[idx],
      };
    });
  },





  // processDataSet(dataSet, limits = null) {
  //   // The mean, variance, and standard deviation of each cell's values
  //   // based on the aggregate time range selected.
  //   const cellResults = [];
  //
  //   dataSet.forEach((item) => {
  //     const result = { id: item.id, cellId: item.c };
  //     let temp = item.t;
  //
  //     if (limits) {
  //       temp = item.t.slice(limits[0], (limits[1] + 1));
  //     }
  //
  //     result.mean = this.getMean(temp);
  //     result.variance = this.getVariance(temp, result.mean);
  //     result.standardDeviation = this.getStandardDeviation(result.variance);
  //
  //     cellResults.push(result);
  //   });
  //
  //
  //   // The entire grid's mean, variance, and standard deviation based on the
  //   // computed values of each cell.
  //   const gridResults = {
  //     mean: this.getMean(cellResults.map((item) => item.mean)),
  //     variance: this.getMean(cellResults.map((item) => item.variance)),
  //     standardDeviation: this.getMean(cellResults.map((item) => item.standardDeviation)),
  //     cells: cellResults,
  //   };
  //
  //   return gridResults;
  // },
  //
  //
  // getMean(array) {
  //   return array.reduce((prev, curr) => prev + curr) / array.length;
  // },
  //
  //
  // getVariance(array, mean = null) {
  //   if (typeOf(mean) !== 'number') {
  //     mean = this.getMean(array);
  //   }
  //
  //   return this.getMean(
  //     array.map((value) => {
  //       return Math.pow(value - mean, 2);
  //     })
  //   );
  // },
  //
  //
  // getStandardDeviation(variance, array = null) {
  //   if (typeOf(variance) !== 'number') {
  //     if (array) {
  //       variance = this.getVariance(array);
  //     }
  //     else {
  //       return null;
  //     }
  //   }
  //
  //   return Math.sqrt(variance);
  // },
});
