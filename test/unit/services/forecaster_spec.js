const Forecaster = require('../../../services/forecaster');
const fixtures = require('../fixtures/forecastio_fixtures');
const chai = require('chai');
const should = require('chai').should();
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

describe('Forecaster', () => {
  context('Initialisation', () => {
    it('fails to initialise if driver object matches empty semantics', () => {
      let forecaster = () => new Forecaster;
      should.throw(forecaster, Error, 'Invalid driver provided.');
    });
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
          Promise.resolve(fixtures.sampleLocationResponse)
        )
      },
      forecaster = new Forecaster(forecastDriver),
      forecastRequest = forecaster.getFullForecastFor(fixtures.validCoordinates);

      return forecastRequest.should.eventually.deep.equal(fixtures.sampleLocationResponse);
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

  describe('#getFullForecastForDay()', () => {
    it('implements a method for retrieving requested weather information for a weekday', () => {
      let forecastDriver = {
        getFullForecastForCoordinatesOnWeekday: sinon.stub()
      },
      forecaster = new Forecaster(forecastDriver);

      forecaster.should.respondTo('getFullForecastForDay');
    });

   it('fails for an invalid coordinate pair through a Promise rejection', () => {
      let forecastDriver = {
        getFullForecastForCoordinatesOnWeekday: sinon.stub()
      },
      forecaster = new Forecaster(forecastDriver),
      forecastRequest = forecaster.getFullForecastForDay(fixtures.invalidCoordinates, fixtures.validWeekday);

      return forecastRequest.should.be.rejected;
    });

   it('fails for an invalid weekday through a Promise rejection', () => {
      let forecastDriver = {
        getFullForecastForCoordinatesOnWeekday: sinon.stub()
      },
      forecaster = new Forecaster(forecastDriver),
      forecastRequest = forecaster.getFullForecastForDay(fixtures.validCoordinates, fixtures.invalidWeekday);

      return forecastRequest.should.be.rejected;
   });

    it('resolves to the value returned by the forecasting driver promise', () => {
      let forecastDriver = {
        getFullForecastForCoordinatesOnWeekday: sinon.stub().withArgs(fixtures.validCoordinates).returns(
          Promise.resolve(fixtures.sampleLocationResponse)
        )
      },
      forecaster = new Forecaster(forecastDriver),
      forecastRequest = forecaster.getFullForecastForDay(fixtures.validCoordinates, fixtures.validWeekday);

      return forecastRequest.should.eventually.deep.equal(fixtures.sampleLocationResponse);
    });

    it('rejects with the error from the geocoding driver', () => {
      let forecastDriver = {
        getFullForecastForCoordinatesOnWeekday: sinon.stub().withArgs(fixtures.validCoordinates).returns(
          Promise.reject(new Error("Connection with API timed out"))
        )
      },
      forecaster = new Forecaster(forecastDriver),
      forecastRequest = forecaster.getFullForecastForDay(fixtures.validCoordinates, fixtures.validWeekday);

      return forecastRequest.should.be.rejectedWith(Error, "Connection with API timed out");
    });
  });

});