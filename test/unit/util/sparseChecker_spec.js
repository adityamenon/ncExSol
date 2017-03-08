const _ = require('lodash');
const sparseChecker = require('../../../util/sparseChecker');
let should = require('chai').should();

describe('sparseChecker', () => {
  it('returns true for an array that contains one empty element', () => {
    let sparseArray = [1, '', 2, 3];
    sparseChecker(sparseArray).should.equal(true);
  });

  it('returns false for an array that contains no empty elements', () => {
    let mixedArray = [1, {foo: 'bar'}, 'testString'];
    sparseChecker(mixedArray).should.equal(false);
  });

  context('Detecting empty arguments', () => {
    context('working with an anonymous function', () => {
      it('returns true for a function that contains one empty argument', () => {
        let sparseArguments = function(one, two, three, four) {
          return arguments;
        }(1, '', 2, 3);

        sparseChecker(sparseArguments).should.equal(true);
      });

      it('returns false for a function called with no empty arguments', () => {
        let mixedArguments = function(one, two, three, four) {
          return arguments;
        }(1, {foo: 'bar'}, 'testString');

        sparseChecker(mixedArguments).should.equal(false);
      });
    });

    context('working with an arrow function', () => {
      it('returns true for a function that contains one empty argument', () => {
        let sparseArguments = ((...args) => {
          return args;
        })(1, '', 2, 3);

        sparseChecker(sparseArguments).should.equal(true);
      });

      it('returns false for a function called with no empty arguments', () => {
        let mixedArguments = ((...args) => {
          return args;
        })(1, {foo: 'bar'}, 'testString');

        sparseChecker(mixedArguments).should.equal(false);
      });
    });

    context('working with a object constructors', () => {
      it('returns true for a function that contains one empty argument', () => {
        let TestClass = class {
          constructor(one, two, three, four) {
            this.args = arguments;
          }
        };

        let sparseArguments = (new TestClass(1, '', 2, 3)).args;

        sparseChecker(sparseArguments).should.equal(true);
      });

      it('returns false for a function called with no empty arguments', () => {
        let TestClass = class {
          constructor(one, two, three, four) {
            this.args = arguments;
          }
        };

        let mixedArguments = (new TestClass(1, {foo: 'bar'}, 'testString')).args;

        sparseChecker(mixedArguments).should.equal(false);
      });
    });

    context('working with a object methods', () => {
      it('returns true for a function that contains one empty argument', () => {
        let TestClass = class {
          testMethod(one, two, three, four) {
            this.args = arguments;
            return this;
          }
        };

        let sparseArguments = (new TestClass).testMethod(1, '', 2, 3).args;

        sparseChecker(sparseArguments).should.equal(true);
      });

      it('returns false for a function called with no empty arguments', () => {
        let TestClass = class {
          testMethod(one, two, three, four) {
            this.args = arguments;
            return this;
          }
        };

        let mixedArguments = (new TestClass).testMethod(1, {foo: 'bar'}, 'testString').args;

        sparseChecker(mixedArguments).should.equal(false);
      });
    });
  });
});
