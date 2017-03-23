const express = require('express');
const supertest = require('supertest');
const app = require('../../app');
const should = require('chai').should();
const nock = require('nock');
const _ = require('lodash');
const config = require('config');
const geocodingFixtures = require('./fixtures/geocoding_fixtures');
const forecastFixtures = require('./fixtures/forecast_fixtures');

context('route to forecast by address and day', () => {
  it('responds to a request with forecast information', (done) => {
    let address = geocodingFixtures.validAddress,
            mapboxAccessToken = config.geocoder.credential,
            geocodingScope = nock('https://api.mapbox.com')
                            .get(`/geocoding/v5/mapbox.places/${address}.json`)
                            .query({access_token: mapboxAccessToken})
                            .reply(200, geocodingFixtures.sampleResponse),
            coordinates = _.values(forecastFixtures.validCoordinates).join(','),
            timestamp = forecastFixtures.forecastDate,
            darkskySecretKey = config.forecaster.credential,
            forecastScope = nock('https://api.darksky.net')
                            .get(`/forecast/${darkskySecretKey}/${coordinates},${timestamp}`)
                            .reply(200, forecastFixtures.sampleLocationDateResponse),
            request = supertest(app);

    request
      .get('/weather/' + geocodingFixtures.validAddress + '/wednesday')
      .set('Accept', 'application/json')
      .end((error, response) => {
        // Geocoding API was called first and completed
        geocodingScope.isDone().should.equal(true);

        // Forecast API was then called, and completed
        forecastScope.isDone().should.equal(true);

        // finally test the response that got back
        response.statusCode.should.equal(200);

        response.headers['content-type'].should.equal('application/json; charset=utf-8');
        response.body.should.deep.equal(forecastFixtures.sampleLocationDateResponse);

        done();
      });
  });
});