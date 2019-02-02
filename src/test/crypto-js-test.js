var expect = require('chai').expect;

describe("Crypto-js tests", function() {
    it("should calculate SHA256", function() {
        var SHA256 = require("crypto-js/sha256");
        var hashed = SHA256("Message", "Key").toString();

        expect(hashed).to.equal('2f77668a9dfbf8d5848b9eeb4a7145ca94c6ed9236e4a773f6dcafa5132b2f91');
    });
});
