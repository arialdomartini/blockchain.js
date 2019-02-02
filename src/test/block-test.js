var expect = require('chai').expect;
var Block = require('../scripts/index.js').Block;


describe('Block tests', function() {
    it('different blocks should have different hashes', function() {

        var block1 = new Block(1, new Date().getDate(), "some data", null);
        var block2 = new Block(100, new Date().getDate(), "some other data", null);

        var hash1 = block1.getHash();
        var hash2 = block2.getHash();

        expect(hash1).to.not.equal(hash2);
    });
});
