import Ember from 'ember';

const {
  typeOf,
} = Ember;


export default class StatUtils {
  // Calculate the mean of an array of numbers.
  static getMean(array) {
    return array.reduce((prev, curr) => prev + curr, 0) / array.length;
  };


  // Calculate the variance of an array of number.
  static getVariance(array, mean = null) {
    if (typeOf(mean) !== 'number') {
      mean = StatUtils.getMean(array);
    }

    return StatUtils.getMean(
      array.map((value) => {
        return Math.pow(value - mean, 2);
      })
    );
  };


  // Calculate the standard deviation of an array of numbers.
  static getStandardDeviation(array = null, variance = null) {
    if (typeOf(variance) !== 'number') {
      if (array) {
        variance = StatUtils.getVariance(array);
      }
      else {
        return null;
      }
    }

    return Math.sqrt(variance);
  };


  // Calculate some percentile `P` of an array of numbers;
  static getPercentile(p, array, sort = true) {
    if (sort) {
      array = array.slice();
      array.sort();
    }

    return array[(Math.ceil(p * array.length)) - 1];
  };


  // Calculate the deciles of an array of numbers;
  static getDeciles(array, sort = true) {
    if (sort) {
      array = array.slice();
      array.sort();
    }

    const result = [];

    // Using 1 - 10 instead of directly adding by 0.1 each iteration because
    // floating point numbers don't always add perfectly. Woohoo!
    for (let i = 1; i < 10; i += 1) {
      result.push(StatUtils.getPercentile((i / 10), array, false));
    }

    return result;
  };


  // Given an array of 9 deciles, find where the provided value lies.
  static decileRank(deciles, value) {
    let i = 1;

    for (i; i < 10; i += 1) {
      if (value < deciles[i]) {
        break;
      }
    }

    return i;
  };
}
