import Ember from 'ember';
import TimeRange from 'smart-city-ui/utils/time-range';
import ColorUtils from 'smart-city-ui/utils/color-utils';
import StatUtils from 'smart-city-ui/utils/stat-utils';

const {
  Service,
  inject,
  computed,
  observer,
  get,
  set,
  getProperties,
  setProperties,
  run: {
    debounce,
  },
} = Ember;


export default Service.extend({
  ajax: inject.service(),

  mapService: inject.service('smart-city-maps'),

  cache: inject.service('grid-data-cache'),


  gridCells: computed('mapService.gridCells', function() {
    return get(this, 'mapService.gridCells');
  }).readOnly(),


  timeRange: computed(function() {
    return TimeRange.create({ range: [0, 287] });
  }).readOnly(),


  activeDrawType: 'score',

  scoresDisabled: false,

  showScores: false,


  evPercentageInFleet: 2,

  chargeRemaining: 100,

  demandActive: true,

  emissionsActive: computed.not('demandActive'),

  evActive: true,

  icActive: computed.not('evActive'),

  aggregateActive: true,

  sweepActive: computed.not('aggregateActive'),

  dayOfWeek: 'mon',


  scoreColors: ColorUtils.getColorPalette('#ce0e00', '#19c600', [0.2, 0.4, 0.6, 0.8]),

  metricColors: ColorUtils.getColorPalette('#ff0000', '#0000ff', [0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9]),

  reverseMetricColors: ColorUtils.getColorPalette('#0000ff', '#ff0000', [0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9]),


  currentColorPalette: computed('activeDrawType', 'demandActive', function() {
    const {
      activeDrawType,
      demandActive,
    } = getProperties(this, ['activeDrawType', 'demandActive']);

    if (activeDrawType === 'score') {
      return get(this, 'scoreColors');
    }
    else if (activeDrawType === 'metric') {
      return get(this, 'demandActive') ? get(this, 'metricColors') : get(this, 'reverseMetricColors');
    }

    return null;
  }).readOnly(),


  currentDataSetKey: computed('dayOfWeek', 'evPercentageInFleet', 'demandActive', function() {
    const day = get(this, 'dayOfWeek');
    const perc = `p${get(this, 'evPercentageInFleet')}`;
    const metric = get(this, 'demandActive') ? 'perc_ee' : 'co2_em';

    return get(this, 'cache').buildPath([day, perc, metric]);
  }).readOnly(),


  // An observer who watches the property values that when changed might require a fresh
  // AJAX call. If an AJAX call is going to be required, then the execution is debounced
  // so we don't wind up spamming the server.
  redrawAfterLoadWatcher: observer('dayOfWeek,evPercentageInFleet,demandActive', function() {
    const {
      cache,
      currentDataSetKey,
    } = getProperties(this, ['cache', 'currentDataSetKey']);

    if (cache.hasEntry(currentDataSetKey)) {
      this.computeFromCurrentSettings();
    }
    else {
      debounce(this, 'computeFromCurrentSettings', 250);
    }
  }),


  // An observer who watches property values that when changes will require the active data
  // set to be recomputed for the map. No AJAX calls required here.
  redrawWatcher: observer('aggregateActive,showScores', function() {
    this.computeFromCurrentSettings();
  }),


  slowRedrawWatcher: observer('timeRange.range.@each,chargeRemaining', function() {
    debounce(this, 'computeFromCurrentSettings', 150);
  }),


  changeDrawType(type) {
    if (type === get(this, 'activeDrawType')) {
      return;
    }

    if (type === 'score') {
      setProperties(this, {
        activeDrawType: 'score',
        scoresDisabled: false,
      });
    }
    else if (type === 'metric') {
      setProperties(this, {
        activeDrawType: 'metric',
        scoresDisabled: true,
        showScores: false,
      });
    }

    this.computeFromCurrentSettings();
  },


  computeFromCurrentSettings() {
    const {
      activeDrawType,
      showScores,
      currentColorPalette,
      currentDataSetKey,
    } = getProperties(this, 'activeDrawType', 'showScores', 'currentColorPalette', 'currentDataSetKey');

    if (activeDrawType === 'score') {
      get(this, 'gridCells').paintGridCells2x(showScores ? 'score' : null, currentColorPalette);
    }
    else if (activeDrawType === 'metric') {
      get(this, 'cache').getEntry(currentDataSetKey).then((results) => {
        get(this, 'gridCells').paintGridCells2x(this.processDataSet(results), currentColorPalette, 'percentile');
      });
    }
  },


  processDataSet(dataSet) {
    const range = get(this, 'timeRange.range');
    const charge = get(this, 'chargeRemaining') / 100;
    const isDemand = get(this, 'demandActive');
    const isAggregate = get(this, 'aggregateActive');

    let timeSlice = null;

    if (isAggregate) {
      timeSlice = dataSet.map((item) => {
        let subset = item.t.slice(range[0], (range[1] + 1));

        if (isDemand) {
          subset = subset.filter((perc) => perc < charge);
        }

        return subset.length ? StatUtils.getMean(subset) : null;
      });
    }
    else {
      timeSlice = dataSet.map(item => item.t[range[0]]);

      if (isDemand) {
        timeSlice = timeSlice.map((perc) => (perc < charge) ? perc : null);
      }
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
});
