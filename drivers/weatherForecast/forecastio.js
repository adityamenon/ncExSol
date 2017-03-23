const _ = require('lodash');
const axios = require('axios');

/**
 * ForecastIO is a weather forecasting driver instance.
 * It handles communication with the Darksky API.
 */
class ForecastIO {
  constructor(secretKey) {
    if (_.isEmpty(secretKey) || ! _.isString(secretKey)) {
      throw new Error('Darksky Secret Key not provided.')
    }

    this.secretKey = secretKey;
  }

  getFullForecastForCoordinates(coordinates) {
    return new Promise((resolve, reject) => {
      let coordinateString = _.values(coordinates).join(',');

      return axios.get(
        `https://api.darksky.net/forecast/${this.secretKey}/${coordinateString}`
      )
      .then(response => resolve(response.data))
      .catch(error => reject(error));
    });
  }

  getFullForecastForCoordinatesOnWeekday(coordinates, weekday) {
    return new Promise((resolve, reject) => {
      let coordinateString = _.values(coordinates).join(',');

      return axios.get(
        `https://api.darksky.net/forecast/${this.secretKey}/${coordinateString},${weekday}`
      )
      .then(response => resolve(response.data))
      .catch(error => reject(error));
    });
  }
}

module.exports = ForecastIO;
