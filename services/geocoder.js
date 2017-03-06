const Mixin = require('../util/mixin');
const Validator = require('./validator');

/**
 * Geocoder utilizes the driver instance passed to it, to geocode addresses.
 * Methods used upon the `driver` object here form the required public interface of the driver class.
 */
class Geocoder {
  constructor(driver) {
    this.driver = driver;
  }

  getCoordinatesFor(address) {
    return new Promise(function (resolve, reject) {
      if (! this.validAddress(address)) return reject(new Error("Invalid Address supplied."));

      return resolve('yolo');
    });
  }
}

Mixin.mix(Validator, Geocoder, [{'address': 'validAddress'}]);

module.exports = Geocoder;