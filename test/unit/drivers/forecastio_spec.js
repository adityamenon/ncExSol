const _ = require('lodash');
const ForecastIO = require('../../../drivers/weatherForecast/forecastio');
const fixtures = require('../fixtures/forecastio_fixtures');
const should = require('chai').should();
const nock = require('nock');

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
                            .reply(200, fixtures.sampleLocationResponse),
          forecastIO = new ForecastIO(darkskySecretKey),
          forecastResult = forecastIO.getFullForecastForCoordinates(fixtures.validCoordinates);

      return forecastResult.then(result => {
        forecastScope.isDone().should.equal(true);
        result.should.deep.equal(fixtures.sampleLocationResponse);
      });
    });

    it('rejects a promise to the error returned by the DarkSky API', () => {
      let coordinates = _.values(fixtures.validCoordinates).join(','),
          darkskySecretKey = 'dummy-secret-key',
          forecastScope = nock('https://api.darksky.net')
                            .get(`/forecast/${darkskySecretKey}/${coordinates}`)
                            .reply(500),
        forecastIO = new ForecastIO(darkskySecretKey),
        forecastResult = forecastIO.getFullForecastForCoordinates(fixtures.validCoordinates);

      return forecastResult.should.be.rejectedWith(Error, 'Request failed with status code 500');
    });
  });

  describe('#getFullForecastForCoordinatesOnWeekday()', () => {
    it('implements a method for retrieving weather forecast for a given weekday via the Darksky API', () => {
      let forecastIO = new ForecastIO('dummy-secret-key');

      forecastIO.should.respondTo('getFullForecastForCoordinates');
    });

    it('resolves a promise to the value returned by the DarkSky API', () => {
      let coordinates = _.values(fixtures.validCoordinates).join(','),
          darkskySecretKey = 'dummy-secret-key',
          futureDate = fixtures.unixTimestampValidWeekday,
          forecastScope = nock('https://api.darksky.net')
                            .get(`/forecast/${darkskySecretKey}/${coordinates},${futureDate}`)
                            .reply(200, fixtures.sampleLocationWeekdayResponse),
          forecastIO = new ForecastIO(darkskySecretKey),
          forecastResult = forecastIO.getFullForecastForCoordinatesOnWeekday(
              fixtures.validCoordinates,
              futureDate
          );

      return forecastResult.then(result => {
        forecastScope.isDone().should.equal(true);
        result.should.deep.equal(fixtures.sampleLocationWeekdayResponse);
      });
    });

    it('rejects a promise to the error returned by the DarkSky API', () => {
      let coordinates = _.values(fixtures.validCoordinates).join(','),
          darkskySecretKey = 'dummy-secret-key',
          futureDate = fixtures.unixTimestampValidWeekday,
          forecastScope = nock('https://api.darksky.net')
                          .get(`/forecast/${darkskySecretKey}/${coordinates},${futureDate}`)
                          .reply(500),
          forecastIO = new ForecastIO(darkskySecretKey),
          forecastResult = forecastIO.getFullForecastForCoordinatesOnWeekday(fixtures.validCoordinates, futureDate);

      return forecastResult.should.be.rejectedWith(Error, 'Request failed with status code 500');
    });
  });
});
