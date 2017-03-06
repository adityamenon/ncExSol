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

```
[WIP!]
After the installation and startup, it's possible to either `curl` the endpoints mentioned in the problem, or visit the 
respective URLs in the browser.- 
```

### Run tests

1. Unit tests: `npm test`
2. Integration tests: Not yet implemented.

### Nice to haves / Caveats / Challenges

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
4. Defensive coding to make up for lack of types and interfaces.
    1. For example, I would have liked to check if a given driver implements all the methods required
    by it's service - but because JS doesn't have any types this can be very cumbersome to implement.
    2. Nonetheless, in a production system I might be tempted to write some defensive code to throw errors
    in case of blatant violations of the interface contract.
    3. Noticed a really [neat trick](https://davidwalsh.name/es6-features#comment-507220) for trying to enforce
    interfaces in ES6, could be worth experimenting with.
5. The `Mixin.mix` utility is unnecessary, I'm sure there are libraries that already implement this (better and 
    much more robustly). Need to search the internet properly again and utilise.
6. The docker image should be pushed to Dockerhub so pulling it and running it would be a snap.
    1. Right now the codebase is in a good deal of flux so I don't want to 'publish' yet. Bad UX to
    make the user build the image by themselves though.

### Even nicer-to-haves

1. `gulpfile` `validate` task should check that:
    1. All defined services have at least one driver.
2. `Facebook Flow` or some other type checking mechanism to ensure
    all the interface expectations can be explicitly defined and met.
3. Highly usable frontend to more easily get and explore the data.