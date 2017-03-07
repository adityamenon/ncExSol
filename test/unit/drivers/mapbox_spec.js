const Mapbox = require('../../../drivers/geocoder/mapbox');
let should = require('chai').should();
let sinon = require('sinon');
let nock = require('nock');

describe('Mapbox', () => {
  const mapboxGeocodeResponseSydneySample = `
    {
       "type" : "FeatureCollection",
       "query" : [
          "sydney"
       ],
       "attribution" : "NOTICE: © 2017 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained.",
       "features" : [
          {
             "properties" : {
                "wikidata" : "Q3130"
             },
             "geometry" : {
                "coordinates" : [
                   151.21,
                   -33.868
                ],
                "type" : "Point"
             },
             "id" : "place.4960085988742460",
             "bbox" : [
                150.520928608,
                -34.118344992,
                151.343020992,
                -33.578140996
             ],
             "place_name" : "Sydney, New South Wales, Australia",
             "context" : [
                {
                   "text" : "2000",
                   "id" : "postcode.207"
                },
                {
                   "id" : "region.3703",
                   "short_code" : "AU-NSW",
                   "wikidata" : "Q3224",
                   "text" : "New South Wales"
                },
                {
                   "id" : "country.3104",
                   "text" : "Australia",
                   "wikidata" : "Q408",
                   "short_code" : "au"
                }
             ],
             "center" : [
                151.21,
                -33.868
             ],
             "text" : "Sydney",
             "relevance" : 0.99,
             "type" : "Feature",
             "place_type" : [
                "place"
             ]
          },
          {
             "text" : "Sydney Airport (SYD)",
             "place_type" : [
                "poi"
             ],
             "relevance" : 0.99,
             "type" : "Feature",
             "properties" : {
                "category" : "airport",
                "landmark" : true,
                "maki" : "airport",
                "address" : "Airport Dr",
                "tel" : "02 9667 9111"
             },
             "geometry" : {
                "type" : "Point",
                "coordinates" : [
                   151.166916,
                   -33.936416
                ]
             },
             "center" : [
                151.166916,
                -33.936416
             ],
             "context" : [
                {
                   "text" : "Mascot",
                   "id" : "locality.9874735187290030"
                },
                {
                   "id" : "place.4960085988742460",
                   "wikidata" : "Q3130",
                   "text" : "Sydney"
                },
                {
                   "text" : "2020",
                   "id" : "postcode.224"
                },
                {
                   "id" : "region.3703",
                   "text" : "New South Wales",
                   "wikidata" : "Q3224",
                   "short_code" : "AU-NSW"
                },
                {
                   "text" : "Australia",
                   "wikidata" : "Q408",
                   "short_code" : "au",
                   "id" : "country.3104"
                }
             ],
             "id" : "poi.13383272831438750",
             "place_name" : "Sydney Airport (SYD), Airport Dr, Sydney, New South Wales 2020, Australia"
          }
       ]
    }
  `;

  context('initialisation', () => {
    it('fails to initialise without an access token', () => {
      let init = () => new Mapbox;
      init.should.throw(Error, 'Mapbox Access Token not provided.');
    });
  });

  describe('#geocodeAddress()', () => {
    it('implements a method for retrieving coordinates via the mapbox API', () => {
      let mapbox = new Mapbox('dummy-access-token');

      mapbox.should.respondTo('geocodeAddress');
    });

    it('resolves a promise to the value returned by the mapbox API', () => {
      let address = 'Sydney',
          mapboxAccessToken = 'dummy-access-token',
          geocodingScope = nock('https://api.mapbox.com')
                            .get(`/geocoding/v5/mapbox.places/${address}.json`)
                            .query({access_token: mapboxAccessToken})
                            .reply(200, mapboxGeocodeResponseSydneySample),
          mapbox = new Mapbox(mapboxAccessToken),
          geocodeResult = mapbox.geocodeAddress(address);

      return geocodeResult.then(result => {
        geocodingScope.isDone().should.equal(true);
        result.should.deep.equal({latitude: '151.21', longitude: '-33.868'});
      });
    });
  });
});