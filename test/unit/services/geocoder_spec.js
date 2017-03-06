const Geocoder = require('../../../services/geocoder');
let should = require('chai').should();

describe('Geocoder', () => {
  let geocoder = new Geocoder();

  context('Check for presence of required validator functions', () => {
    it('has access to an implementation of geo coordinates validity checker', () => {
      geocoder.should.respondTo('validCoordinates');
    });
  });
});