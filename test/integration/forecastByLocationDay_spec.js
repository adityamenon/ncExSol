const express = require('express');
const supertest = require('supertest');
const app = require('../../app');
const should = require('chai').should();
const nock = require('nock');
const _ = require('lodash');
const config = require('config');
const mapboxFixtures = require('../unit/fixtures/mapbox_fixtures');
const forecastIOFixtures = require('../unit/fixtures/forecastio_fixtures');

context('forecast by address filtered by day route', () => {
  it('responds to a request with forecast information', (done) => {
    let address = mapboxFixtures.validAddress,
        mapboxAccessToken = config.geocoder.credential,
        geocodingScope = nock('https://api.mapbox.com')
                          .get(`/geocoding/v5/mapbox.places/${address}.json`)
                          .query({access_token: mapboxAccessToken})
                          .reply(200, mapboxFixtures.sampleResponse),
        coordinates = _.values(forecastIOFixtures.validCoordinates).join(','),
        darkskySecretKey = config.forecaster.credential,
        forecastScope = nock('https://api.darksky.net')
                          .get(`/forecast/${darkskySecretKey}/${coordinates}`)
                          .reply(200, forecastIOFixtures.sampleResponse),
        request = supertest(app);

    request.get('/weather/' + mapboxFixtures.validAddress, {
      headers: {
        'Accept': 'application/json'
      }
    }).end((error, response) => {
      // Geocoding API was called first and completed
      geocodingScope.isDone().should.equal(true);

      // Forecast API was then called, and completed
      forecastScope.isDone().should.equal(true);

      // finally test the response that got back
      response.statusCode.should.equal(200);

      done();
    });
  });
});