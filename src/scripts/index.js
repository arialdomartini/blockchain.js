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
        return new Block(0, null, 'Genesis Block', '0');
    }
}

module.exports.Block = Block;
module.exports.GenesisBlock = GenesisBlock;
