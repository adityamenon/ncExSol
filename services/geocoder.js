const Mixin = require('../util/mixin');
const Validator = require('./validator');
const _ = require('lodash');

/**
 * Geocoder utilizes the driver instance passed to it, to geocode addresses.
 * Methods used upon the `driver` object here form the required public interface of the driver class.
 */
class Geocoder {
  constructor(driver) {
    this.driver = driver;
  }

  getCoordinatesFor(address) {
    return new Promise((resolve, reject) => {
      if (! this.validAddress(address)) return reject(new Error("Invalid Address supplied."));

      if (! this.driver && ! _.isFunction(this.driver.geocodeAddress)) {
      	return reject(new Error("Invalid Geocoding driver."));
      }

      return this.driver.geocodeAddress(address).then(
      	coordinates => resolve(coordinates)
      ).catch(
      	error => reject(error)
      );
    });
  }
}

Mixin.mix(Validator, Geocoder, [{'address': 'validAddress'}]);

module.exports = Geocoder;