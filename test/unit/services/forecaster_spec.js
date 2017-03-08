const Forecaster = require('../../../services/forecaster');
let should = require('chai').should();

describe('Forecaster', () => {
  context('Check for presence of required validator functions', () => {
    let forecaster = new Forecaster();
    it('has access to an implementation of geo coordinates validity checker', () => {
      forecaster.should.respondTo('validCoordinates');
    });
  });

  describe('#getForecastFor()', () => {
    it('implements a method for retrieving requested weather information', () => {
      let forecaster = new Forecaster;

      forecaster.should.respondTo('getForecastFor');
    });
  });
});