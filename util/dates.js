const moment = require('moment');
const _ = require('lodash');

class Dates {
  static futureDayTimestamp(dayName) {
    dayName = _.trim(dayName);

    // avoid locale problems in runtime environments
    // possible because the application is not to be timezone aware
    let referenceMoment = moment().utc(false),
        referenceMomentCopy = referenceMoment.clone();

    // If the ISO weekday of the passed date matches
    // with the ISO weekday of today,
    // provide a timestamp 7 days from now
    if (referenceMomentCopy.isoWeekday(dayName).isoWeekday() === referenceMoment.isoWeekday()) {
      return referenceMoment.add(7, 'days').unix();
    }

    // otherwise, use the default momentjs logic to just look for the next
    // day in the upcoming week to match the provided day name
    return referenceMoment.isoWeekday(dayName).unix();
  }
}

module.exports = Dates;