const Mixin = require('../util/mixin');
const Validator = require('./validator');

/**
 * Forecaster utilizes the driver instance passed to it, to retrieve weather forecast data.
 * Methods used upon the `driver` object here form the required public interface of the driver class.
 */
class Forecaster {
  constructor(coordinates, driver) {
    this.coordinates = coordinates;
    this.driver = driver;
  }
}

Mixin.mix(Validator, Forecaster, [{'latLongPair': 'validCoordinates'}]);

module.exports = Forecaster;