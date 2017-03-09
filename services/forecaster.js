// forecast.io sends us all the data we need to answer all three types of queries for a location
  // driver is then sent information about location
// either way, just raw object is received from data source, and the processing to query for the data required will
  // in this service

const Mixin = require('../util/mixin');
const Validator = require('./validator');
const _ = require('lodash');
const sparseChecker = require('../util/sparseChecker');

/**
 * Forecaster utilizes the driver instance passed to it, to retrieve weather forecast data.
 * Methods used upon the `driver` object here form the required public interface of the driver class.
 */
class Forecaster {
  constructor(driver) {
    if(sparseChecker(driver) || ! _.isFunction(driver.getFullForecastForCoordinates)) {
      throw new Error('Invalid driver provided.');
    }

    this.driver = driver;
  }

  getForecastFor() {

  }
}

Mixin.mix(Validator, Forecaster, [{'latLongPair': 'validCoordinates'}]);

module.exports = Forecaster;