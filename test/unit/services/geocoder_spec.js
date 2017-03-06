const Geocoder = require('../../../services/geocoder');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let should = chai.should();

describe('Geocoder', () => {

  describe('#getCoordinatesFor()', () => {

    it('implements a method for retrieving coordinates via the driver', () => {
      let geocoder = new Geocoder;

      geocoder.should.respondTo('getCoordinatesFor');
    });

    it('fails for an invalid address through a Promise rejection', () => {
      let geocoder = new Geocoder,
          invalidAddress = {},
          geocodingRequest = geocoder.getCoordinatesFor(invalidAddress);

      return geocodingRequest.should.be.rejected;
    });

    // it('fails when a geocoding driver is not supplied', () => {
    //   let geocoder = new Geocoder,
    //   address = 'Sydney',
    //   geocodingRequest = geocoder.getCoordinatesFor(address);
    //
    //   return geocodingRequest.should.be.rejected;
    // });
  });

});