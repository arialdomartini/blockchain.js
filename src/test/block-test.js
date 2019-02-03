var expect = require('chai').expect;
require('chai').should();
var index = require('../scripts/index.js');
var Block = index.Block;
var GenesisBlock = index.GenesisBlock;
var Blockchain = index.Blockchain;

describe('Blocks', function() {
    it('should have different hashes', function() {

        var block1 = new Block(1, new Date().getDate(), "some data");
        var block2 = new Block(100, new Date().getDate(), "some other data");

        var hash1 = block1.hash;
        var hash2 = block2.hash;

        expect(hash1).to.not.equal(hash2);
    });

    it('are valid if their hash match the hash of their content', function() {
        var block = new Block(100, "some date", "some data");
        block.mine(4);

        expect(block.isValid()).to.equal(true);
    });

    it('are not valid if their hash does not match the hash of their content', function() {
        var block = new Block(100, "some date", "some data");

        block.data = 'modified data';

        expect(block.isValid()).to.equal(false);
    });

    it('when mined gets a hash beginning with zeroes', function() {
        var block = new Block(100, "some date", "some data");

        block.mine(4);

        expect(block.hash.substring(0, 4)).to.equal('0000');
    });

    it('detects if a strings begins with n zeroes', function() {
        Block.beginsWithZeroes('000012', 4).should.equal(true);
        Block.beginsWithZeroes('012', 1).should.equal(true);
        Block.beginsWithZeroes('000012', 3).should.equal(true);

        Block.beginsWithZeroes('000012', 5).should.equal(false);
        Block.beginsWithZeroes('179312', 4).should.equal(false);
        Block.beginsWithZeroes('0300012', 4).should.equal(false);
        Block.beginsWithZeroes('001792', 4).should.equal(false);
    });
});

describe('Genesis block', function() {
    it('should have no parents', function() {
        var genesisBlock = GenesisBlock.createNew();

        expect(genesisBlock.parentBlock).to.equal(null);
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
        var blockchain = Blockchain.createWithDifficulty(0);

        expect(blockchain.chain.length).to.equal(1);
        expect(blockchain.chain[0].data).to.equal('Genesis Block');
    });

    it('should return the last block in the chain', function() {
        var blockchain = Blockchain.createWithDifficulty(0);

        var lastBlock = blockchain.getLastBlock();

        expect(lastBlock.data).to.equal('Genesis Block');

        blockchain.chain[1] = new Block(1, null, 'some data');

        expect(blockchain.getLastBlock().data).to.equal('some data');
    });

    it('should append a new block', function() {
        var blockchain = Blockchain.createWithDifficulty(0);

        var newBlock = new Block(0, null, "some data");
        blockchain.addBlock(newBlock);

        var lastBlock = blockchain.getLastBlock();
        expect(lastBlock.data).to.equal('some data');
    });

    it('appended blocks have a reference to the last block', function() {
        var blockchain = Blockchain.createWithDifficulty(0);
        var genesisBlock = blockchain.getLastBlock();

        var newBlock = new Block(0, null, "some data", null);
        blockchain.addBlock(newBlock);

        var lastBlock = blockchain.getLastBlock();
        expect(lastBlock.parentBlock).to.equal(genesisBlock.hash);
    });

    it('should append blocks to blocks, not only to the Genesis Block', function() {
        var blockchain = Blockchain.createWithDifficulty(0);

        blockchain.addBlock(new Block(0, null, "some data 1"));
        var block1 = blockchain.getLastBlock();

        blockchain.addBlock(new Block(0, null, "some data 2"));

        var block2 = blockchain.getLastBlock();
        expect(block2.parentBlock).to.equal(block1.hash);
    });


    it('should append blocks including a difficulty in mining', function() {
        const difficulty = 2;
        var blockchain = Blockchain.createWithDifficulty(difficulty);

        blockchain.addBlock(new Block(0, null, "some data"));

        var block = blockchain.getLastBlock();

        expect(block.nonce).to.not.equal(0);
        expect(Block.beginsWithZeroes(block.hash, difficulty));
        expect(block.isValid()).to.equal(true);
        expect(blockchain.isValid()).to.equal(true);
    });


    it('should detect when a chain with no difficulty is valid', function() {
        var blockchain = Blockchain.createWithDifficulty(0);
        blockchain.addBlock(new Block(1, null, "some value"));
        blockchain.addBlock(new Block(1, null, "other value"));
        blockchain.addBlock(new Block(1, null, "foobar"));
        blockchain.addBlock(new Block(1, null, "barbaz"));

        expect(blockchain.isValid()).to.equal(true);
    });

    it('should detect when a chain with some difficulty is valid', function() {
        var blockchain = Blockchain.createWithDifficulty(2);
        blockchain.addBlock(new Block(1, null, "some value"));
        blockchain.addBlock(new Block(1, null, "other value"));
        blockchain.addBlock(new Block(1, null, "foobar"));
        blockchain.addBlock(new Block(1, null, "barbaz"));

        expect(blockchain.isValid()).to.equal(true);
    });

    it('should detect when a chain is not valid', function() {
        var blockchain = Blockchain.createWithDifficulty(0);
        blockchain.addBlock(new Block(1, null, "some value"));
        blockchain.addBlock(new Block(1, null, "other value"));
        blockchain.addBlock(new Block(1, null, "foobar"));
        blockchain.addBlock(new Block(1, null, "barbaz"));

        blockchain.chain[2] = new Block(10, null, 'extraneous block', null);

        expect(blockchain.isValid()).to.equal(false);
    });

    it('should detect if one block has been modified', function() {
        var blockchain = Blockchain.createWithDifficulty(0);
        blockchain.addBlock(new Block(1, null, "some value"));
        blockchain.addBlock(new Block(1, null, "other value"));
        blockchain.addBlock(new Block(1, null, "foobar"));
        blockchain.addBlock(new Block(1, null, "barbaz"));

        blockchain.chain[2].data = 'modified data';

        expect(blockchain.isValid()).to.equal(false);
    });
});
