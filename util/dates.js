const moment = require('moment');
const _ = require('lodash');

class Dates {
  static futureDayTimestamp(dayName) {
    dayName = _.trim(dayName).toLocaleLowerCase();

    // avoid locale problems in runtime environments
    // possible because the application is not to be timezone aware
    let referenceMoment = moment().utc(false),
        referenceMomentCopy = referenceMoment.clone();

    // if we're just trying to get for `today`, return the current time
    if(dayName === 'today') {
      return referenceMoment.unix();
    }

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