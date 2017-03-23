const Validator = require('../../../services/validator');
const should = require('chai').should();
const _ = require('lodash');

describe('Validator', () => {

  context('Check for presence of all validator implementations', () => {
    it('implements a latLongPair validator', () => {
      Validator.should.haveOwnProperty('latLongPair');
    });

    it('implements an address validator', () => {
      Validator.should.haveOwnProperty('address');
    })
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

  describe('.address', () => {
    it('judges address not passed as strings to be invalid', () => {
      let invalidAddress = {};

      Validator.address(invalidAddress).should.equal(false);
    });

    it('judges address that is longer than 300 characters to be invalid', () => {
      let invalidAddress = _.padEnd("address", 301, "x");

      Validator.address(invalidAddress).should.equal(false);
    });

    it('is not fooled by whitespace', () => {
      let invalidAddress = _.padEnd("", 200);

      Validator.address(invalidAddress).should.equal(false);
    });
  });

  describe('.day', () => {
    it('judges day not passed as strings to be invalid', () => {
      let invalidDay = {};

      Validator.day(invalidDay).should.equal(false);
    });

    it('rejects everything that is not a day of the week', () => {
      let invalidDay = 'FreakyFriday';

      Validator.day(invalidDay).should.equal(false);
    });

    it('has the correct idea about what the days of the week are', () => {
      let validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

      Validator.day.validDaysOfTheWeek.should.deep.equal(validDays);
    });
  });
});