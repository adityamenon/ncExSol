// we need a caching service
  // the caching service will store the information received from forecast-io into Redis
// forecast.io sends us all the data we need to answer all three types of queries for a location
  // the service should check for the hash of the coords in cache before making a new request
    // could consider the cache layer usage to be configurable
  // cache service is `mixed in` based on configuration
  // driver is then sent information about location
// either way, just raw object is received from data source, and the processing to query for the data required will
  // in this service

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

  getForecastFor() {

  }
}

Mixin.mix(Validator, Forecaster, [{'latLongPair': 'validCoordinates'}]);

module.exports = Forecaster;