[![Build Status](https://travis-ci.org/adityamenon/ncExSol.svg?branch=master)](https://travis-ci.org/adityamenon/ncExSol)
[![Coverage Status](https://coveralls.io/repos/github/adityamenon/ncExSol/badge.svg?branch=master)](https://coveralls.io/github/adityamenon/ncExSol?branch=master)

### Solution for a Node.js take-home exercise

Not mentioning the company name for privacy. Exercise located here: https://goo.gl/JWghex

### Usage

1. `$ git clone` this repository and `cd` to its directory.
2. Make sure to install Node.js version `6.10.0` - consider using `nvm`. 
3. Then run the following commands:
    1. `$ npm install`
    2. `$ npm start`
4. Open `http://0.0.0.0:3000`

#### Usage with Docker

(To avoid having to install another version of `node` just to run this one application.)

1. Install the native Docker client for your machine: https://www.docker.com/community-edition and start it.
2. `$ git clone` this repository and `cd` to its directory.
3. Then run the following commands:
    1. `$ docker build -t adityamenon/nc-ex-sol .`
    2. `$ docker run -p 49160:3000 -d adityamenon/nc-ex-sol`
4. Open `http://0.0.0.0:49160`
5. TODO: add instructions for configuration changes

```
[WIP!]
After the installation and startup, it's possible to either `curl` the endpoints mentioned in the problem, or visit the 
respective URLs in the browser.- 


```

### Run tests

1. Unit tests: `npm test`
2. Integration tests: Not yet implemented.

### Caveats / Challenges / Nice to haves

(not implemented due to time constraints)

1. Better organisation of generated express.js init code.
    1. Some basic work lives in the `attempt_better_express_init` task.
    2. Inspired by what I saw in [Ghost](https://github.com/TryGhost/Ghost/blob/master/core/server/index.js) 
    initialisation code.
    3. Couldn't implement because I need a lot more time for wrapping my mind around _testing_ such code.
2. More integration tests.
    1. Wanted to test coherent reactions of the API when one of the data APIs fails, for example, and further expansions like testing a proper 500 being returned at every single level of failure. But currently lack the time to expand that much.
    2. My current integration still mock the API, so they're more at a functional level. Need more tests that actually also rely on the real APIs.
        1. Doing this would require figuring out a configuration setup to provide real access tokens to these APIs as well, and probably running a separate docker container for it, too much complication to complete the test.
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
    1. Right now the codebase is in a good deal of flux so I don't want to 'publish' yet. Bad UX to
    make the user build the image by themselves though.
7. Needing to use `haveOwnProperty` instead of `respondsTo` assertion particularly for testing presence of 
    static methods on classes. Not sure why the latter isn't working as expected, needs research.
8. The validator service has potential to become extremely messy as the application grows, it will need
    to be broken down into sub-services (and libraries could be used).
9. forecast.io actually appears to send a lot of data to answer all three queries with just one request. With a bit more
    time, I'd like a cache layer in here. Didn't include because I'll also need to set up docker compose to run multiple
    containers and link them up. The forecaster Service makes it easier to implement a cache layer when this is done
    though.
11. Need a dependency injection container (Scatter or Electrolyte) to be able to register drivers for services automatically without the current
    cumbersome instantiation process.
12. JSLINT!!
13. NODE_PATH!!


### Even nicer-to-haves

1. `gulpfile` `validate` task should check that:
    1. All defined services have at least one driver.
2. `Facebook Flow` or some other type checking mechanism to ensure
    all the interface expectations can be explicitly defined and met.
3. Highly usable frontend to more easily play with the data.