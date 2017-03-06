### Solution for a Node.js take-home exercise

Not mentioning the company name for privacy. Exercise located here: https://goo.gl/JWghex

### Usage

1. Install the native Docker client for your machine: https://www.docker.com/community-edition and start it.
2. `$ git clone` this repository and `cd` to its directory.
3. `$ docker up`
4. Open `http://0.0.0.0:9000`
5. Supports HTML and JSON rendering of the three endpoints mentioned in the problem. 

### Run tests

1. Unit tests: `npm test`
2. Integration tests: `blah blah`

### Nice to haves

(not implemented due to time constraints)

1. Better organisation of generated express.js init code.
    1. Some basic work lives in the `attempt_better_express_init` task.
    2. Inspired by what I saw in [Ghost](https://github.com/TryGhost/Ghost/blob/master/core/server/index.js) 
    initialisation code.
    3. Couldn't implement because I need a lot more time for wrapping my mind around _testing_ such code.
2. Geocoding information caching
    1. Adding a cache layer would be in violation of the Mapbox ToS. Not sure if Google Maps
       free edition allows for this. 
3. Use the MapBox and forecast.io libraries.
    1. Wasn't sure if they have proper libraries for node.js, and didn't want to work out
    mocking/stubbing their specific API during testing. It was easier to treat them as HTTP
    resources and use uniform code to deal with them.
    2. However it might be prudent in the future to use their libraries to get access to features
    I may otherwise miss out on.

### Even nicer-to-haves

1. `gulpfile` `validate` task should check that:
    1. All defined services have at least one driver.
2. `Facebook Flow` or some other type checking mechanism to ensure
    all the interface expectations can be explicitly defined and met.
3. Highly usable frontend to more easily get and explore the data.