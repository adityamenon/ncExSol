const Mixin = require('../util/mixin');
const Validator = require('./validator');
const _ = require('lodash');
const sparseChecker = require('../util/sparseChecker');

/**
 * Geocoder utilizes the driver instance passed to it, to geocode addresses.
 * Methods used upon the `driver` object here form the required public interface of the driver class.
 */
class Geocoder {
  constructor(driver) {
    if(sparseChecker(driver) || ! _.isFunction(driver.geocodeAddress)) {
      throw new Error('Invalid driver provided.');
    }

    this.driver = driver;
  }

  getCoordinatesFor(address) {
    return new Promise((resolve, reject) => {
      if (! this.validAddress(address)) return reject(new Error("Invalid Address supplied."));

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