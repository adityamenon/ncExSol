// After that, it's a few short modifications to the incoming data to serve each of those three endpoints
// testing the creation of those three endpoints is a simple matter of using sinon to mock

// what would be final is the integration tests and the configuration bit...

const _ = require('lodash');
const ForecastIO = require('../../../drivers/weatherForecast/forecastio');
const fixtures = require('../fixtures/forecastio_fixtures');
require('chai').should();
let sinon = require('sinon');
let nock = require('nock');

describe('ForecastIO', () => {

  context('initialisation', () => {
    it('fails to initialise without a secret key', () => {
      let init = () => new ForecastIO;
      init.should.throw(Error, 'Darksky Secret Key not provided.');
    });
  });

  describe('#getFullForecastForCoordinates()', () => {
    it('implements a method for retrieving weather forecast via the Darksky API', () => {
      let forecastIO = new ForecastIO('dummy-secret-key');

      forecastIO.should.respondTo('getFullForecastForCoordinates');
    });

    it('resolves a promise to the value returned by the DarkSky API', () => {
      let coordinates = _.values(fixtures.validCoordinates).join(','),
          darkskySecretKey = 'dummy-secret-key',
          forecastScope = nock('https://api.darksky.net')
                            .get(`/forecast/${darkskySecretKey}/${coordinates}`)
                            .reply(200, fixtures.sampleResponse),
          forecastIO = new ForecastIO(darkskySecretKey),
          forecastResult = forecastIO.getFullForecastForCoordinates(fixtures.validCoordinates);

      return forecastResult.then(result => {
        forecastScope.isDone().should.equal(true);
        result.should.deep.equal(fixtures.sampleResponse);
      });
    });
  });
});