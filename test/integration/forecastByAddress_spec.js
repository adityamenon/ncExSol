// TODO: change all requires to constants in the codebase - those variables aren't allowed to be reassigned,
// and assigning new properties on them as objects seems to work anyway - and mocking will also work - damn that's so weird
const express = require('express');
const supertest = require('supertest');
const app = require('../../app');
const should = require('chai').should();
const nock = require('nock');
const _ = require('lodash');
// TODO: Integration tests should have their own fixtures
const mapboxFixtures = require('../unit/fixtures/mapbox_fixtures');
const forecastIOFixtures = require('../unit/fixtures/forecastio_fixtures');

context('forecast by address route', () => {
	it('responds to a request with forecast information', (done) => {
		let address = mapboxFixtures.validAddress,
          	mapboxAccessToken = 'dummy-access-token',
          	geocodingScope = nock('https://api.mapbox.com')
                            .get(`/geocoding/v5/mapbox.places/${address}.json`)
                            .query({access_token: mapboxAccessToken})
                            .reply(200, mapboxFixtures.sampleResponse),
            coordinates = _.values(forecastIOFixtures.validCoordinates).join(','),
          	darkskySecretKey = 'dummy-secret-key',
          	forecastScope = nock('https://api.darksky.net')
                            .get(`/forecast/${darkskySecretKey}/${coordinates}`)
                            .reply(200, forecastIOFixtures.sampleResponse),
        	request = supertest(app);

		// Geocoding API was called first and completed
		geocodingScope.isDone().should.equal(true);

		// Forecast API was then called, and completed
		forecastScope.isDone().should.equal(true);

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

		// unfortunately, `request` does not appear to have the `then` keyword
		request.get('/weather/'.concat(mapboxFixtures.validAddress)).end((error, response) => {
			response.statusCode.should.equal(200);
			response.body.should.deeply.equal(forecastIOFixtures.sampleResponse);
			done();
		});
	});
});