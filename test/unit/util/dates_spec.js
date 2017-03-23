const should = require('chai').should();
const sinon = require('sinon');
const moment = require('moment');
const Dates = require('../../../util/dates');

describe('Dates', () => {
  let clock;

  beforeEach(() => {
    // freezing time for the test, at
    // Monday, March 20th 2017, 12:00:00 am UTC+00:00
    clock = sinon.useFakeTimers(1489968000 * 1000);
  });

  describe('.futureDayTimestamp', () => {
    it('implements a method futureDayTimestamp', () => {
      Dates.should.haveOwnProperty('futureDayTimestamp');
    });

    it('provides UNIX seconds for a day in the future week', () => {
      Dates.futureDayTimestamp('Wednesday').should.equal(1490140800);
    });

    it('provides UNIX seconds for the same day next week if passed day is same as today', () => {
      Dates.futureDayTimestamp('Monday').should.equal(1490572800);
    });

    it('provides UNIX seconds for the current time if the passed day is the word `today`', () => {
      Dates.futureDayTimestamp('TodAy').should.equal(1489968000);
    });
  });

  afterEach(() => clock.restore());
});