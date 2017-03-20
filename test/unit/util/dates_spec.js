const should = require('chai').should();
const sinon = require('sinon');
const moment = require('moment');
const Dates = require('../../../util/Dates');

describe('Dates', () => {
  let clock;

  beforeEach(() => {
    // freezing time for the test, at 20th Mar 2017
    clock = sinon.useFakeTimers(moment('20-03-2017', 'DD-MM-YYYY').valueOf());
  });

  describe('.futureDayTimestamp', () => {
    it('implements a method futureDayTimestamp', () => {
      Dates.should.haveOwnProperty('futureDayTimestamp');
    });

    it('provides UNIX seconds for a day in the future week', () => {
      Dates.futureDayTimestamp('Wednesday').should.equal(1490112000);
    });

    it('provides UNIX seconds for the same day next week if passed day is same as today', () => {
      Dates.futureDayTimestamp('Monday').should.equal(1490544000);
    });
  });

  afterEach(() => clock.restore());
});