const geocodingFixtures = {
  validAddress: 'Sydney',
  sampleResponse: {
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
};

module.exports = geocodingFixtures;