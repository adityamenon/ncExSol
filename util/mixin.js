const _ = require('lodash');

/**
 * Utility to provide mixin functionality.
 *
 * The `mix` method accepts a Source class, Target class, and an array of strings representing the method names to mix.
 * It picks the specified methods from the Source class and adds them to the prototype of the Target class, such that
 * when new instances of the Target class are created thereafter, the instances will have access to the specified
 * methods.
 */
class Mixin {
  static mix(Source, Target, methodList) {
    methodList.forEach(methodName => {
      if (_.isString(methodName)) {
        Target.prototype[methodName] = Source[methodName];
      } else if(_.isObject(methodName)) {
        let methodNameObject = methodName,
            sourceMethodName = Object.keys(methodNameObject)[0],
            targetMethodName = methodNameObject[sourceMethodName];

        Target.prototype[targetMethodName] = Source[sourceMethodName];
      }
    });

    return Target;
  }
}

module.exports = Mixin;