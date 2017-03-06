const Mixin = require('../util/mixin');
const Validator = require('./validator');

/**
 * Geocoder utilizes the driver instance passed to it, to geocode addresses.
 * Methods used upon the `driver` object here form the required public interface of the driver class.
 */
class Geocoder {
  constructor(address, driver) {
    this.address = address;
    this.driver = driver;
  }
}

Mixin.mix(Validator, Geocoder, [{'address': 'validAddress'}]);

module.exports = Geocoder;