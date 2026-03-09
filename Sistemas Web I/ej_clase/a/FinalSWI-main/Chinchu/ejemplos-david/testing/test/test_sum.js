let sum = require('../sum.js');
let assert = require('chai').assert;

describe('#sum()', function() {
    // add a test hook
    beforeEach(function() {
    // ...some logic before each test is run
    });

    // test a functionality
    it('should add numbers', function() {
    // add an assertion
    assert.equal(sum(1, 2, 3, 4, 5),15);
    //expect(sum(1, 2, 3, 4, 5)).to.equal(15);
    });
});