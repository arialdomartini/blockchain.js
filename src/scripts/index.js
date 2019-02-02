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

module.exports.Block = Block;
