import Ember from 'ember';
import moment from 'moment';

const {
  Component,
  computed,
  get,
  set,
  typeOf,
} = Ember;


export default Component.extend({
  classNames: ['topbar'],

  mapService: null,

  gridDirector: null,




  isPlayDisabled: computed.or('gridDirector.{timeRange.isPlaying,aggregateActive}'),

  isPauseDisabled: computed.or('gridDirector.{timeRange.isPaused,aggregateActive}'),

  isTimeRangeDisabled: computed.and('gridDirector.{timeRange.isPlaying,sweepActive}'),


  evPercentageInFleetInt: computed('gridDirector.evPercentageInFleet', {
    get() {
      return get(this, 'gridDirector.evPercentageInFleet');
    },

    set(key, value) {
      value = typeOf(value) === 'string' ? parseInt(value) : value;

      set(this, 'gridDirector.evPercentageInFleet', value);
      return value;
    },
  }),


  chargeRemainingInt: computed('gridDirector.chargeRemaining', {
    get() {
      return get(this, 'gridDirector.chargeRemaining');
    },

    set(key, value) {
      value = typeOf(value) === 'string' ? parseInt(value) : value;

      set(this, 'gridDirector.chargeRemaining', value);
      return value;
    },
  }),


  formattedTimeRange: computed('gridDirector.timeRange.range.@each', function() {
    const range = get(this, 'gridDirector.timeRange.range');
    const start = moment('00:00', 'hh:mm').add(range[0] * 5, 'm').format('hh:mma');
    const end = moment('00:00', 'hh:mm').add(range[1] * 5, 'm').format('hh:mma');

    return { start, end };
  }),


  actions: {
    onDemandOrEmissionsToggle(isDemand) {
      set(this, 'gridDirector.demandActive', isDemand);
    },


    onEvOrIcToggle(isEv) {
      set(this, 'gridDirector.evActive', isEv);
    },


    onAggregateOrSweepToggle(isAggregate) {
      set(this, 'gridDirector.aggregateActive', isAggregate);

      if (isAggregate) {
        get(this, 'gridDirector.timeRange').pauseRange();
      }
    },


    onPlayClick() {
      get(this, 'gridDirector.timeRange').playRange();
    },


    onPauseClick() {
      get(this, 'gridDirector.timeRange').pauseRange();
    },
  },


  // didInsertElement() {
  //  this._super(...arguments);

  //  set(this, 'dataConductor.scoreColorsEnabled', false);
  //  get(this, 'dataConductor').computeFromCurrentSettings();

    // get(this, 'mapService.gridCells').enableHeatMap();
    // get(this, 'dataConductor').computeFromCurrentSettings();
  // },


  willDestroyElement() {
    get(this, 'gridDirector.timeRange').pauseRange();

    // set(this, 'dataConductor.scoreColorsEnabled', true);

    // get(this, 'mapService.gridCells').disableHeatMap();

    this._super(...arguments);
  },
});