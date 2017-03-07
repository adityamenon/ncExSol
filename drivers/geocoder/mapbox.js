const _ = require('lodash');
const axios = require('axios');

/**
 * Mapbox is a geocoder driver instance.
 * It handles communication with the Mapbox API, and processing of the results.
 */
class Mapbox {
  constructor(accessToken) {
    if (_.isEmpty(accessToken) || ! _.isString(accessToken)) {
      throw new Error('Mapbox Access Token not provided.')
    }

    this.accessToken = accessToken;
  }

  // Not doing any validations here, because this driver
  // is meant to be used via the service.
  geocodeAddress(address) {
    return new Promise((resolve, reject) => {
      return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`, {
        params: {
          access_token: this.accessToken
        }
      }).then(response => {
        return resolve(extractCoordinates(response.data));
      });
    });
  }
}

const extractCoordinates = mapboxData => {
  let firstFeature = mapboxData.features[0]; // TODO: ideally should be filtered by highest relevance score

  return {
    latitude: `${firstFeature.center[0]}`, // typecasting to string
    longitude: `${firstFeature.center[1]}`
  };
};

module.exports = Mapbox;
