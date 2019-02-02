const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, createdAt, data, parentBlock) {
        this.index = index;
        this.createdAt = createdAt;
        this.data = data;
        this.parentBlock = parentBlock;
    }

    getHash() {
        return SHA256(this.index + this.createdAt + this.data + this.parentBlock)
            .toString();
    }
}

class GenesisBlock {
    static createNew() {
        return new Block(0, null, 'Genesis Block', null);
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
        newBlock.parentBlock = this.getLastBlock().getHash();
        this.chain[this.chain.length] = newBlock;
    }
}

module.exports.Block = Block;
module.exports.GenesisBlock = GenesisBlock;
module.exports.Blockchain = Blockchain;
