const express = require('express');
const supertest = require('supertest');
const app = require('../../app');
const should = require('chai').should();
const nock = require('nock');
const _ = require('lodash');
const config = require('config');
const geocodingFixtures = require('./fixtures/geocoding_fixtures');
const forecastFixtures = require('./fixtures/forecast_fixtures');

context('forecast by address route', () => {
	it('responds to a request with forecast information', (done) => {
		let address = geocodingFixtures.validAddress,
          	mapboxAccessToken = config.geocoder.credential,
          	geocodingScope = nock('https://api.mapbox.com')
                            .get(`/geocoding/v5/mapbox.places/${address}.json`)
                            .query({access_token: mapboxAccessToken})
                            .reply(200, geocodingFixtures.sampleResponse),
            coordinates = _.values(forecastFixtures.validCoordinates).join(','),
          	darkskySecretKey = config.forecaster.credential,
          	forecastScope = nock('https://api.darksky.net')
                            .get(`/forecast/${darkskySecretKey}/${coordinates}`)
                            .reply(200, forecastFixtures.sampleResponse),
            request = supertest(app);

		/**
		  * During Integration testing, I'm not sure what the better strategy is: 
		  * 1. Test that the data APIs in question are being exercised or
		  * 2. Test that the internal code services etc are being called or
		  * 3. Do both.
		  * 
		  * It felt like it was overkill to pick option (3)
		  * It felt "right" to do option (1), because the internal services do have their own tests to verify
		  * they are working, and at the route level, we are more concerned that the app is doing the "big picture"
		  * stuff correctly.
		*/

		request
      .get('/weather/' + geocodingFixtures.validAddress)
      .set('Accept', 'application/json')
      .end((error, response) => {
        // Geocoding API was called first and completed
        geocodingScope.isDone().should.equal(true);

        // Forecast API was then called, and completed
        forecastScope.isDone().should.equal(true);

        // finally test the response that got back
        response.statusCode.should.equal(200);

        response.headers['content-type'].should.equal('application/json; charset=utf-8');
        response.body.should.deep.equal(forecastFixtures.sampleResponse);

        done();
		  });
	});
});