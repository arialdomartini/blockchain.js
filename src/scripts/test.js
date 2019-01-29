function Person(name, lastname) {
    this.name = name;
    this.lastname = lastname
    this.complete_name = name + ' ' + lastname;
    this.greet = function() {
        return "Hi, I'm " + complete_name;
    }
}

class Block {
    constructor(transactions, hash) {
        this.transactions = transactions;
        this.hash = hash;
    }

    status() {
        return this.hash;
    }
}

var block = new Block('some transacions', 'some hash');
console.log(block.status())


var AnonymousClass = class {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return this.name;
    }
}

var instance = new AnonymousClass('some name');
console.log(instance.greet());

