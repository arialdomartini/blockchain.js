const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, transactions) {
        this.index = index;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return this.calculateWithNonce(this.nonce);
    }

    calculateWithNonce(nonce) {
        return SHA256(this.index + this.transactions + nonce + this.parentBlock)
            .toString();
    }

    isValid() {
        return this.hash === this.calculateHash();
    }

    mine(difficulty) {
        var nonce = 0;
        while(!Block.beginsWithZeroes(this.calculateWithNonce(nonce), difficulty)) {
            nonce = nonce + 1;
        }
        this.nonce = nonce;
        this.hash = this.calculateHash();
    }

    static beginsWithZeroes(hash, difficulty) {
        return hash.substring(0, difficulty) === '0'.repeat(difficulty);
    }
}

class GenesisBlock {
    static createNew() {
        var genesisBlock = new Block(0, 'Genesis Block');
        genesisBlock.parentBlock = null;
        genesisBlock.hash = genesisBlock.calculateHash();
        return genesisBlock;
    }
}

class Blockchain {
    constructor(difficulty) {
        this.chain = [ GenesisBlock.createNew() ];
        this.difficulty = difficulty;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    static createWithDifficulty(difficulty) {
        return new Blockchain(difficulty);
    }

    addBlock(newBlock) {
        newBlock.parentBlock = this.getLastBlock().hash;
        newBlock.mine(this.difficulty);
        this.chain.push(newBlock);
    }

    isValid() {
        var previousBlockHash = null;
        for(var i = 0; i < this.chain.length; i++)
        {
            var currentBlock = this.chain[i];
            if(currentBlock.parentBlock !== previousBlockHash)
                return false;
            if(! currentBlock.isValid())
                return false;
            previousBlockHash = currentBlock.hash;
        }
        return true;
    }
}

module.exports.Block = Block;
module.exports.GenesisBlock = GenesisBlock;
module.exports.Blockchain = Blockchain;
