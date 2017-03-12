const Forecaster = require('../../../services/forecaster');
const fixtures = require('../fixtures/forecastio_fixtures');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let sinon = require('sinon');

chai.use(chaiAsPromised);
let should = chai.should();

describe('Forecaster', () => {
  context('Initialisation', () => {
    it('fails to initialise if driver object matches empty semantics', () => {
      let forecaster = () => new Forecaster;
      should.throw(forecaster, Error, 'Invalid driver provided.');
    });

    it('fails to initialise if driver object does not contain required methods', () => {
      let forecaster = () => new Forecaster({foo: 'bar'});
      should.throw(forecaster, Error, 'Invalid driver provided.');
    })
  });

  context('Check for presence of required validator functions', () => {
    let forecastDriver = {
          getFullForecastForCoordinates: sinon.stub()
        },
        forecaster = new Forecaster(forecastDriver);
    it('has access to an implementation of geo coordinates validity checker', () => {
      forecaster.should.respondTo('validCoordinates');
    });
  });

  describe('#getFullForecastFor()', () => {
    it('implements a method for retrieving requested weather information', () => {
      let forecastDriver = {
        getFullForecastForCoordinates: sinon.stub()
      },
      forecaster = new Forecaster(forecastDriver);

      forecaster.should.respondTo('getFullForecastFor');
    });

   it('fails for an invalid coordinate pair through a Promise rejection', () => {
      let forecastDriver = {
        getFullForecastForCoordinates: sinon.stub()
      },
      forecaster = new Forecaster(forecastDriver),
      forecastRequest = forecaster.getFullForecastFor(fixtures.invalidCoordinates);

      return forecastRequest.should.be.rejected;
    });

    it('resolves to the value returned by the forecasting driver promise', () => {
      let forecastDriver = {
        getFullForecastForCoordinates: sinon.stub().withArgs(fixtures.validCoordinates).returns(
          Promise.resolve(fixtures.sampleResponse)
        )
      },
      forecaster = new Forecaster(forecastDriver),
      forecastRequest = forecaster.getFullForecastFor(fixtures.validCoordinates);

      return forecastRequest.should.eventually.deep.equal(fixtures.sampleResponse);
    });

    it('rejects with the error from the geocoding driver', () => {
      let forecastDriver = {
        getFullForecastForCoordinates: sinon.stub().withArgs(fixtures.validCoordinates).returns(
          Promise.reject(new Error("Connection with API timed out"))
        )
      },
      forecaster = new Forecaster(forecastDriver),
      forecastRequest = forecaster.getFullForecastFor(fixtures.validCoordinates);

      return forecastRequest.should.be.rejectedWith(Error, "Connection with API timed out");
    });
  });

});