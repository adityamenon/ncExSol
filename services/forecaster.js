const Mixin = require('../util/mixin');
const Validator = require('./validator');
const Dates = require('../util/dates');
const _ = require('lodash');

/**
 * Forecaster utilizes the driver instance passed to it, to retrieve weather forecast data.
 * Methods used upon the `driver` object here form the required public interface of the driver class.
 */
class Forecaster {
  constructor(driver) {
    if (!driver) {
      throw new Error('Invalid driver provided.');
    }

    this.driver = driver;
  }

  getFullForecastFor(coordinates) {
    return new Promise((resolve, reject) => {
      if (!this.validCoordinates(coordinates)) return reject(new Error("Invalid Coordinates supplied."));

      return this.driver.getFullForecastForCoordinates(coordinates)
              .then(forecast => resolve(forecast))
              .catch(error => reject(error));
    });
  }

  getFullForecastForDay(coordinates, weekday) {
    return new Promise((resolve, reject) => {
      if (!this.validCoordinates(coordinates) || !this.validWeekday(weekday)) {
        return reject(new Error("Invalid coordinates or weekday supplied."));
      }

      let futureTimestamp = Dates.futureDayTimestamp(weekday);

      return this.driver.getFullForecastForCoordinatesOnWeekday(coordinates, futureTimestamp)
              .then(forecast => resolve(forecast))
              .catch(error => reject(error));
    });
  }
}

Mixin.mix(Validator, Forecaster, [
  {'latLongPair': 'validCoordinates'},
  {'day': 'validWeekday'}
]);

module.exports = Forecaster;