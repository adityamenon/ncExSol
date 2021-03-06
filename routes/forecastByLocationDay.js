const router = require('express').Router();
const config = require('config');

const geocoderConfig = config.geocoder;
const forecasterConfig = config.forecaster;

const GeocoderDriver = require('../drivers/geocoder/' + geocoderConfig.driver);
const Geocoder = require('../services/geocoder');

const ForecasterDriver = require('../drivers/weatherForecast/' + forecasterConfig.driver);
const Forecaster = require('../services/forecaster');

router.get('/weather/:location/:weekday', (request, response, next) => {
  const location = request.params.location,
        weekday = request.params.weekday,
        geoDriver = new GeocoderDriver(geocoderConfig.credential),
        geocoder = new Geocoder(geoDriver),
        forecastDriver = new ForecasterDriver(forecasterConfig.credential),
        forecaster = new Forecaster(forecastDriver);

  geocoder.getCoordinatesFor(location)
          .then(coordinates => forecaster.getFullForecastForDay(coordinates, weekday))
          .then(forecast => {
            return response.format({
              html: () => response.render('fullForecast', {forecast}),
              json: () => {
                response.send(forecast)
              }
            });
          })
          .catch(error => {
            next({status: 500, message: error, error});
          });
});

module.exports = router;
