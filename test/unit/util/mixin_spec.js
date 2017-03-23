const Mixin = require('../../../util/mixin');
const should = require('chai').should();

describe('Mixin', () => {
  it('implements a method mix', () => {
    Mixin.should.haveOwnProperty('mix');
  });

  describe('.mix', () => {
    it('appends requested methods to prototype of Target class', function () {
      let Source = class {
        foo() {}
        bar() {}
        baz() {}
      };
      let Target = class {};
      let methodList = ['foo', 'baz'];

      Mixin.mix(Source, Target, methodList);

      Target.prototype.should.haveOwnProperty('foo');
      Target.prototype.should.haveOwnProperty('baz');
    });

    it('does not append irrelevant methods to the prototype of the Target class', function () {
      let Source = class {
        foo() {}
        bar() {}
        baz() {}
      };
      let Target = class {};
      let methodList = ['foo', 'baz'];

      Mixin.mix(Source, Target, methodList);

      Target.prototype.should.not.haveOwnProperty('bar');
    });

    it('renames the method with name `key` to `value` when methodList contains a hash', function () {
      let Source = class {
        foo() {}
        bar() {}
        baz() {}
      };
      let Target = class {};
      let methodList = ['foo', {'baz': 'fizz'}];

      Mixin.mix(Source, Target, methodList);

      Target.prototype.should.haveOwnProperty('fizz');
      Target.prototype.should.not.haveOwnProperty('baz');
    });

    it('does not affect the Target class prototype if the source name is not a string or object', function () {
      let Source = class {
        foo() {}
        bar() {}
        baz() {}
      };
      let Target = class {};
      let methodList = [null, undefined, 2];
      let SavedPrototype = Target.prototype;

      Mixin.mix(Source, Target, methodList);

      Target.prototype.should.deep.equal(SavedPrototype);
    });
  });
});

