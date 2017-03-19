const _ = require('lodash');

/**
 * sparseChecker makes sure none of the elements of a given collection
 * match the _.isEmpty() semantic.
 *
 * We start with `true`, then merge it with the result of checking empty-ness of each element.
 * We end up with `true`, iff every element evaluated to false on the empty-ness check.
 *
 * Useful to make sure none of the arguments of a function call are `empty`.
 *
 */

const sparseChecker = collection => _.reduce(collection, (result, value) => result && _.isEmpty(value), true);

module.exports = sparseChecker;