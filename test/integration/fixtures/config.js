const appConfig = {
  geocoder: {
    driver: "mapbox",
    credential: "dummy-access-token"
  },
  forecaster: {
    driver: "forecastio",
    credential: "dummy-secret-key" 
  }
};

module.exports = appConfig;