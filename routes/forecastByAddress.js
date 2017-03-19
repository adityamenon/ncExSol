// TODO: render the results according to the incoming request format header
const router = require('express').Router();
const config = require('../config');

/**
  * Loading drivers dynamically from the configuration
  * allows for dynamically switching out drivers for various other services
  * that provide the same functionality in the future
  */

const GeocoderDriver = require('../drivers/geocoder/' + config.geocoder.driver);
const Geocoder = require('../services/geocoder');

const ForecasterDriver = require('../drivers/weatherForecast/' + config.forecaster.driver);
const Forecaster = require('../services/forecaster');

router.get('/weather/:location', (request, response) => {
	const location = request.params.location,
		    geoDriver = new GeocoderDriver(config.geocoder.credential),
		    geocoder = new Geocoder(geoDriver),
        forecastDriver = new ForecasterDriver(config.forecaster.credential),
        forecaster = new Forecaster(forecastDriver);

  geocoder.getCoordinatesFor(location)
          .then(coordinates => forecaster.getFullForecastFor(coordinates))
          .then(forecast => {
            response.send(forecast);
          })
          .catch(error => {
            throw error;
          });
});

module.exports = router;