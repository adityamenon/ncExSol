const Geocoder = require('../../../services/geocoder');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const should = chai.should();

chai.use(chaiAsPromised);

describe('Geocoder', () => {

  context('Initialisation', () => {
    it('fails to initialise if driver object matches empty semantics', () => {
      let geocoder = () => new Geocoder;
      should.throw(geocoder, Error, 'Invalid driver provided.');
    });
  });

  describe('#getCoordinatesFor()', () => {

    it('implements a method for retrieving coordinates via the driver', () => {
      let geoDriver = {
            geocodeAddress: sinon.stub()
          },
          geocoder = new Geocoder(geoDriver);

      geocoder.should.respondTo('getCoordinatesFor');
    });

    it('fails for an invalid address through a Promise rejection', () => {
      let geoDriver = {
            geocodeAddress: sinon.stub()
          },
          geocoder = new Geocoder(geoDriver),
          invalidAddress = {},
          geocodingRequest = geocoder.getCoordinatesFor(invalidAddress);

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