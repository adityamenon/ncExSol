// TODO: render the results according to the incoming request format header
const router = require('express').Router();
const config = require('config');

/**
  * Loading drivers dynamically from the configuration
  * allows for dynamically switching out drivers for various other services
  * that provide the same functionality in the future
  */
const geocoderConfig = config.geocoder;
const forecasterConfig = config.forecaster;

const GeocoderDriver = require('../drivers/geocoder/' + geocoderConfig.driver);
const Geocoder = require('../services/geocoder');

const ForecasterDriver = require('../drivers/weatherForecast/' + forecasterConfig.driver);
const Forecaster = require('../services/forecaster');

router.get('/weather/:location', (request, response) => {
	const location = request.params.location,
		    geoDriver = new GeocoderDriver(geocoderConfig.credential),
		    geocoder = new Geocoder(geoDriver),
        forecastDriver = new ForecasterDriver(forecasterConfig.credential),
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