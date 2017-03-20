const moment = require('moment');
const _ = require('lodash');

class Dates {
  static futureDayTimestamp(dayName) {
    dayName = _.trim(dayName);

    // If the ISO weekday of the passed date matches
    // with the ISO weekday of today,
    // provide a timestamp 7 days from now
    if (moment().isoWeekday(dayName).isoWeekday() === moment().isoWeekday()) {
      return moment().add(7, 'days').unix();
    }

    // otherwise, use the default momentjs logic to just look for the next
    // day in the upcoming week to match the provided day name
    return moment().isoWeekday(dayName).unix();
  }
}

module.exports = Dates;