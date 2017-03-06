const Validator = require('../../../services/validator');
let should = require('chai').should();

describe('Validator', () => {

  context('Check for presence of all validator implementations', () => {
    it('implements a latLongPair validator', () => {
      Validator.should.haveOwnProperty('latLongPair');
    });
  });

  describe('.latLongPair', () => {

    it('judges a proper latitude and longitude pair submitted as a hash as valid', () => {
      let validLatLongPair = {
        latitude: '151.21',
        longitude: '-33.868'
      };

      Validator.latLongPair(validLatLongPair).should.equal(true);
    });

    it('judges an incorrectly submitted latitude as invalid', () => {
      let invalidLatLongPair = {
        latitude: '.151.21',
        longitude: '-33.868'
      };

      Validator.latLongPair(invalidLatLongPair).should.equal(false);
    });

    it('judges an incorrectly submitted longitude as invalid', () => {
      let invalidLatLongPair = {
        latitude: '151.21',
        longitude: 'asdf'
      };

      Validator.latLongPair(invalidLatLongPair).should.equal(false);
    });
  });
});