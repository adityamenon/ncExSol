const Forecaster = require('../../../services/forecaster');
let should = require('chai').should();
let sinon = require('sinon');

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

  describe('#getForecastFor()', () => {
    it('implements a method for retrieving requested weather information', () => {
      let forecastDriver = {
        getFullForecastForCoordinates: sinon.stub()
      },
      forecaster = new Forecaster(forecastDriver);

      forecaster.should.respondTo('getForecastFor');
    });
  });
});