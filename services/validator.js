const _ = require('lodash');

/**
 * Validator
 *
 * This class knows nothing about the outside world.
 * Methods within simply receive input of any kind,
 * and get checked for validity according to business rules as may apply.
 * Each method returns a boolean.
 * All the methods are intended to be 'mixed into' the prototype chain of any class that needs validation.
 */

class Validator {

  /**
   * latLongPair checks if the latitude and longitude provided in the hash are valid coordinate strings
   *
   * @param latLongHash
   * @returns {boolean|Array|{index: number, input: string}}
   *
   * Param choices:
   * 1. Choosing to implement as a hash because there isn't native `tuple` in JS
   * 2. Choosing to use string values in the hash because of imprecise floating point representation in JS.
   */
  static latLongPair(latLongHash) {
    /* TODO: can be refactored by extracting the "checking" of each
       into a single private function and then running against both */
    let latitude = latLongHash.latitude,
        longitude = latLongHash.longitude,
        validityRegex = /-?[0-9]+\.[0-9]+$/,
        latitudeResult = validityRegex.exec(latitude),
        latitudeValid =  latitudeResult instanceof Array && latitudeResult.index === 0,
        longitudeResult = validityRegex.exec(longitude),
        longitudeValid = longitudeResult instanceof Array && longitudeResult.index === 0;

    return latitudeValid && longitudeValid;
  }

  static address(address) {
    let sanitizedAddress = _.trim(address);

    return _.isString(address) &&
            sanitizedAddress.length > 0 &&
            sanitizedAddress.length <= 300; // TODO: make this arbitrary limit configurable
  }
}

module.exports = Validator;