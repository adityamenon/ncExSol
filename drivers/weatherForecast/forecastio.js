// loads up the API secret from config
// calls the urlGenerator utility to find out how to query the actual Forecast IO API
// sends the API request to get the forecast information
// rejects or resolves the promise according to the result received

// Now that the shell 'service' has been setup to talk between my classes and the API, I need the driver to actually
// communicate with the forecast.io API and give me the results.

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

  // TODO: handle darksky API failures
  getFullForecastForCoordinates(coordinates) {
    return new Promise((resolve, reject) => {
      let coordinateString = _.values(coordinates).join(',');

      return axios.get(
        `https://api.darksky.net/forecast/${this.secretKey}/${coordinateString}`
      ).then(response => {
        return resolve(response.data);
      });
    });
  }
}

module.exports = ForecastIO;
