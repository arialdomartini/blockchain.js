var expect = require('chai').expect;
var index = require('../scripts/index.js');
var Block = index.Block;
var GenesisBlock = index.GenesisBlock;
var Blockchain = index.Blockchain;

describe('Blocks', function() {
    it('should have different hashes', function() {

        var block1 = new Block(1, new Date().getDate(), "some data", null);
        var block2 = new Block(100, new Date().getDate(), "some other data", null);

        var hash1 = block1.getHash();
        var hash2 = block2.getHash();

        expect(hash1).to.not.equal(hash2);
    });
});

describe('Genesis block', function() {
    it('should have no parents', function() {
        var genesisBlock = GenesisBlock.createNew();

        expect(genesisBlock.parentBlock).to.equal(0);
    });

    it('should have index 0', function() {
        var genesisBlock = GenesisBlock.createNew();

        expect(genesisBlock.index).to.equal(0);
    });

    it('should have default content', function() {
        var genesisBlock = GenesisBlock.createNew();

        expect(genesisBlock.data).to.equal('Genesis Block');
    });
});

describe('Blockchain', function() {
    it('when created should contain the Genesis Block', function() {
        var blockchain = Blockchain.create();

        expect(blockchain.chain.length).to.equal(1);
        expect(blockchain.chain[0].data).to.equal('Genesis Block');
    });
});
