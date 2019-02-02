const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, createdAt, data) {
        this.index = index;
        this.createdAt = createdAt;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.createdAt + this.data + this.parentBlock)
            .toString();
    }

    isValid() {
        return this.hash === this.calculateHash();
    }
}

class GenesisBlock {
    static createNew() {
        var genesisBlock = new Block(0, null, 'Genesis Block');
        genesisBlock.parentBlock = null;
        genesisBlock.hash = genesisBlock.calculateHash();
        return genesisBlock;
    }
}

class Blockchain {
    constructor() {
        this.chain = [ GenesisBlock.createNew() ];
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    static create() {
        return new Blockchain();
    }

    addBlock(newBlock) {
        newBlock.parentBlock = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
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
