const Mapbox = require('../../../drivers/geocoder/mapbox');
const fixtures = require('../fixtures/mapbox_fixtures');
require('chai').should();
let sinon = require('sinon');
let nock = require('nock');

describe('Mapbox', () => {

  context('initialisation', () => {
    it('fails to initialise without an access token', () => {
      let init = () => new Mapbox;
      init.should.throw(Error, 'Mapbox Access Token not provided.');
    });
  });

  describe('#geocodeAddress()', () => {
    it('implements a method for retrieving coordinates via the mapbox API', () => {
      let mapbox = new Mapbox('dummy-access-token');

      mapbox.should.respondTo('geocodeAddress');
    });

    it('resolves a promise to the value returned by the mapbox API', () => {
      let address = fixtures.validAddress,
          mapboxAccessToken = 'dummy-access-token',
          geocodingScope = nock('https://api.mapbox.com')
                            .get(`/geocoding/v5/mapbox.places/${address}.json`)
                            .query({access_token: mapboxAccessToken})
                            .reply(200, fixtures.sampleResponse),
          mapbox = new Mapbox(mapboxAccessToken),
          geocodeResult = mapbox.geocodeAddress(address);

      return geocodeResult.then(result => {
        geocodingScope.isDone().should.equal(true);
        result.should.deep.equal({longitude: '151.21', latitude: '-33.868'});
      });
    });
  });
});