const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(timeStamp, payerAddress, payeeAddress, amount) {
        this.timeStamp = timeStamp;
        this.payerAddress = payerAddress;
        this.payeeAddress = payeeAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(index, transactions) {
        this.index = index;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
        this.unminedTransactions = [];
        this.miningReward = 15;
    }

    calculateHash() {
        return this.calculateWithNonce(this.nonce);
    }

    calculateWithNonce(nonce) {
        return SHA256(this.index + JSON.stringify(this.transactions) + nonce + this.parentBlock)
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

    //     constructor(timeStamp, payerAddress, payeeAddress, amount) {
    mineCurrentBlock(minerAddress) {
        let block = new Block(Date.now(), this.unminedTransactions, this.getLastBlock().hash);
        block.mine(this.difficulty);
        console.log('Block successfully mined');
        this.chain.push(block);
        this.unminedTransactions = [
            new Transaction(Date.now(), 'mint', minerAddress, this.miningReward  )
        ];
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
