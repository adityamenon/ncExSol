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

router.get('/weather/:location', (request, response, next) => {
	const location = request.params.location,
		    geoDriver = new GeocoderDriver(geocoderConfig.credential),
		    geocoder = new Geocoder(geoDriver),
        forecastDriver = new ForecasterDriver(forecasterConfig.credential),
        forecaster = new Forecaster(forecastDriver);

  return geocoder.getCoordinatesFor(location)
          .then(coordinates => forecaster.getFullForecastFor(coordinates))
          .then(forecast => {
            return response.format({
              html: () => response.render('fullForecast', {forecast}),
              json: () => response.send(forecast)
            });
          })
          .catch(error => {
            next({status: 500, message: error, error});
          });
});

module.exports = router;