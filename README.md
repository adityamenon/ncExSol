[![Build Status](https://travis-ci.org/adityamenon/ncExSol.svg?branch=master)](https://travis-ci.org/adityamenon/ncExSol)
[![Coverage Status](https://coveralls.io/repos/github/adityamenon/ncExSol/badge.svg?branch=master)](https://coveralls.io/github/adityamenon/ncExSol?branch=master)

### Solution for a Node.js take-home exercise

Not mentioning the company name for privacy. Exercise located here: https://goo.gl/JWghex

### Usage

1. `$ git clone` this repository and `cd` to its directory.
2. Make sure to install Node.js version `6.10.0` - consider using `nvm`.
3. Make a copy of the configuration sample file: `$ cp ./config/default.sample.js ./config/default.js`
4. IMPORTANT: Update the configuration file with your Mapbox Access Token and Forecast.io secret key.
5. Then run the following commands:
    1. `$ npm install`
    2. `$ npm start`
6. Open the routes of the app as mentioned in the test description with the base URL http://localhost:3000/

#### Usage with Docker

(To avoid having to install another version of `node` just to run this one application.)

1. Install the native Docker client for your machine: https://www.docker.com/community-edition and start it.
2. `$ git clone` this repository and `cd` to its directory.
3. Make a copy of the configuration sample file: `$ cp ./config/default.sample.js ./config/default.js`
4. IMPORTANT: Update the configuration file with your Mapbox Access Token and Forecast.io secret key.
5. Then run the following commands:
    1. `$ docker build -t adityamenon/nc-ex-sol .`
    2. `$ docker run -p 49160:3000 -d adityamenon/nc-ex-sol`
6. Open the routes of the app as mentioned in the test description with the base URL `http://0.0.0.0:49160`

After the installation and startup, it's possible to either `curl` the endpoints mentioned in the problem, or visit the
respective URLs in the browser.

In order to receive the results in `JSON`, please attach the `Accept: application/json` header when querying the
endpoint. Example: `curl http://0.0.0.0:49160/weather/sydney/today -H 'Accept: application/json'`

### Run tests

1. Unit tests: `npm test`
2. Integration tests: `npm run integ-test`

### Application structure

The app is kickstarted by (mostly) the default generated Express.js code in `app.js` and `./bin/www`.

Each Route is defined in `./app.js`. We `use` the route configurations exported from the files in `./routes/*.js` to
configure the routes available to express. Each route utilizes Services which it self instantiates, using app 
configuration to find their names and credentials. These Services are then exercised in a chained manner of Promise 
resolution or failure, and results are returned to the user. In case of errors, they are sent to the Node.js default,
simple, middleware to generate HTTP 500 errors.
 
Each Service exposes an interface for returning it's data, via Promises. However, the internal details of the APIs they
request are abstracted into Drivers. This allows for adding various API providers for each function/service we're using,
without changing a lot of test or actual code, and neatly "plugging in" new Drivers via Configuration.

Drivers communicate with the APIs required, and themselves in turn return Promises which eventually fail or succeed.

Utilities are files and functionality that are required across this stack.

Services, Drivers, Utilities all have dependencies which are injected at instantiation or function execution, to make
testing easier and have stronger control over the flow of data and logic without side effects.
 
### Dependencies

1. axios - Wrapper / sugar to get neat looking HTTP calls - it's also isomorphic, so I'd use it in future iterations
   of more sophisticated browser code.
2. body-parser - Default express.js middleware to parse incoming form data.
3. config - Configuration library with some _great_ config features, including environment detection to switch config
   files, and zero-effort multiple hierarchical overrides (environment variables, command line arguments) for free.
4. debug - Default express.js dependency for pretty console output.
5. express - Superstar web server.
6. jade - Default express.js templating library
7. lodash - Array, Collection and String utilities with concise syntax.
8. moment - Date parsing and manipulation library for JS, removes all pain.
9. morgan - Default express.js logging dependency; currently not being used to fullest extent but can be for saving log
   files etc.

#### Development-specific

1. chai - BDD assertion library, I use the `target.should` syntax.
2. chai-as-promised - Provides a `promise.should.eventually.asertion` syntax.
3. coveralls - to display and analyse coverage information via coveralls.io 
4. eslint - code linter to integrate with your IDE
5. eslint-config-google - following the Google ESLint standard
6. mocha - test runner
7. nock - awesome HTTP interceptor for mocking network requests during tests
8. nyc - CLI coverage information generator, baked into the `npm test` script
9. sinon - mocking library with powerful features including "freezing" time for tests
10. supertest - powerful express.js mocking library to write integration tests without having to start `listen`ing on
   express.

### Caveats, Challenges, Nice to haves

(not implemented mostly due to time constraints)

1. Better organisation of generated express.js init code.
    1. Some basic work lives in the `attempt_better_express_init` task.
    2. Inspired by what I saw in [Ghost](https://github.com/TryGhost/Ghost/blob/master/core/server/index.js) 
    initialisation code.
2. More integration tests.
    1. Wanted to test coherent reactions of the API when one of the data APIs fails, for example, and further expansions
     like testing a proper 500 being returned at every single level of failure. But currently lack the time to expand 
     that much.
    2. My current integration still mock the API, so they're more at a functional level. Need more tests that actually 
    also rely on the real APIs.
        1. Doing this would require figuring out a configuration setup to provide real access tokens to these APIs as 
        well, and probably running a separate docker container for it, too much complication to complete the assignment.
    3. Supertest library doesn't appear to support the `response.format` shortcut I liked to use in my routes for 
    responding in two different formats. Need to raise a PR to supertest to fix this.
2. Geocoding information caching
    1. Adding a cache layer would be in violation of the Mapbox ToS. Not sure if Google Maps
       free edition allows for this. 
3. Use the MapBox and forecast.io libraries.
    1. Wasn't sure if they have proper libraries for node.js, and didn't want to work out
    mocking/stubbing their specific API during testing. It was easier to treat them as HTTP
    resources and use uniform code to deal with them.
    2. However it might be prudent in the future to use their libraries to get access to features
    I may otherwise miss out on.
4. Defensive coding to make up for lack of types and interfaces.
    1. For example, I would have liked to check if a given driver implements all the methods required
    by it's service - but because JS doesn't have any types this can be very cumbersome to implement.
    2. Nonetheless, in a production system I might be tempted to write some defensive code to throw errors
    in case of blatant violations of the interface contract.
    3. Noticed a really [neat trick](https://davidwalsh.name/es6-features#comment-507220) for trying to enforce
    interfaces in ES6, could be worth experimenting with.
5. The `Mixin.mix` utility is unnecessary, I'm sure there are libraries that already implement this (better and 
    much more robustly). Need to search the internet properly again and utilise.
    1. Found _.mixin later on, but it's interface is not quite what I'm after with my rendition.
6. The docker image should be pushed to Dockerhub so pulling it and running it would be a snap.
7. Needing to use `haveOwnProperty` instead of `respondsTo` assertion particularly for testing presence of 
   static methods on classes. Not sure why the latter isn't working as expected, needs research.
8. The validator service has potential to become extremely messy as the application grows, it will need
   to be broken down into sub-services (and libraries could be used).
9. forecast.io actually appears to send a lot of data to answer all three queries with just one request. With a bit more
   time, I'd like a cache layer in here. Didn't include because I'll also need to set up docker compose to run multiple
   containers and link them up. The forecaster Service makes it easier to implement a cache layer when this is done
   though.
11. Need a dependency injection container (Scatter or Electrolyte) to be able to register drivers for services 
    automatically without the current cumbersome instantiation process.
12. Error sophistication: Currently all failures end in a HTTP 500, but generating HTTP 4xx errors in case of user error
    would be a great start to improvements.
13. The test files violate `no-undef` rule in ESLint, would be nice to ignore that specific rule in those files in one
    config.

### Even nicer-to-haves

1. `gulpfile` `validate` task should check that:
    1. All defined services have at least one driver.
2. `Facebook Flow` or some other type checking mechanism to ensure
    all the interface expectations can be explicitly defined and met.
3. Highly usable frontend to more easily play with the data.
