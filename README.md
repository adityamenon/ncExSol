### Nice to haves
(not implemented for lack of time)
1. Better organisation of generated express.js init code.
    1. Some basic work lives in the `attempt_better_express_init` task.
    2. Inspired by what I saw in [Ghost](https://github.com/TryGhost/Ghost/blob/master/core/server/index.js) 
    initialisation code.
    3. Couldn't implement because I need a lot more time for wrapping my mind around _testing_ such code.

### Even nicer-to-haves
1. `gulpfile` `validate` task should check that:
    1. All defined services have at least one driver.
2. `Facebook Flow` or some other type checking mechanism to ensure
    all the interface expectations can be explicitly defined and met.