import Ember from 'ember';

const {
  Object: EmberObject,
  computed,
  get,
  setProperties,
  set,
} = Ember;


export default EmberObject.extend({
  range: [0, 99],

  intervalId: null,

  intervalDelay: 250,

  intervalCounter: null,

  isPaused: true,

  isPlaying: computed.not('isPaused'),


  playRange() {
    if (get(this, 'intervalId')) {
      return;
    }

    const range = get(this, 'range');
    const max = range[1] - range[0];

    const ticker = () => {
      const tickCount = get(this, 'intervalCounter');
      const newRange = [range[0] + tickCount, range[1]];

      set(this, 'range', newRange);

      if (tickCount === max) {
        this.pauseRange();
      }

      this.incrementProperty('intervalCounter');
    };

    setProperties(this, {
      isPaused: false,
      intervalId: setInterval(ticker, get(this, 'intervalDelay')),
      intervalCounter: 0,
    });

    ticker();
  },


  pauseRange() {
    const intervalId = get(this, 'intervalId');

    if (!intervalId) {
      return;
    }

    clearInterval(intervalId);

    setProperties(this, {
      isPaused: true,
      intervalId: null,
      intervalCounter: null,
    });
  },
});
