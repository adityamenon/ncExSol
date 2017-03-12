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

  getFullForecastFor(coordinates) {
    return new Promise((resolve, reject) => {
      if (! this.validCoordinates(coordinates)) return reject(new Error("Invalid Coordinates supplied."));

      return this.driver.getFullForecastForCoordinates(coordinates).then(
        forecast => resolve(forecast)
      ).catch(
        error => reject(error)
      );
    });
  }
}

Mixin.mix(Validator, Forecaster, [{'latLongPair': 'validCoordinates'}]);

module.exports = Forecaster;