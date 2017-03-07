const Geocoder = require('../../../services/geocoder');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let sinon = require('sinon');

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

    it('fails when a geocoding driver is not supplied', () => {
      let geocoder = new Geocoder,
      address = 'Sydney',
      geocodingRequest = geocoder.getCoordinatesFor(address);
    
      return geocodingRequest.should.be.rejected;
    });

    it('resolves to the value returned by the geocoding driver promise', () => {
      // The geocoder driver is expected to implement a geocodeAddress() method
      // which returns a promise, upon whose resolution we get a latLong hash.
      let geoDriver = {
        geocodeAddress: sinon.stub().withArgs('Sydney').returns(
            Promise.resolve({latitude: '151.21', longitude: '-33.868'})
          )
      };

      let geocoder = new Geocoder(geoDriver),
          address = 'Sydney',
          geocodingRequest = geocoder.getCoordinatesFor(address);

      return geocodingRequest.should.eventually.deep.equal(
        {latitude: '151.21', longitude: '-33.868'}
      );
    });

    it('rejects with the error from the geocoding driver', () => {
      let geoDriver = {
        geocodeAddress: sinon.stub().withArgs('Sydney').returns(
            Promise.reject(new Error("Connection with API timed out"))
          )
      };

      let geocoder = new Geocoder(geoDriver),
          address = 'Sydney',
          geocodingRequest = geocoder.getCoordinatesFor(address);

      return geocodingRequest.should.be.rejectedWith(Error, "Connection with API timed out");
    });
  });
});