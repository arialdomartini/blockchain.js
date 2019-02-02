var expect = require('chai').expect;
var Crypto = require('crypto-js');

describe("Crypto-js tests", function() {
    it("should calculate SHA256", function() {
        var hashed = Crypto.SHA256("Message", "Key").toString();

        expect(hashed).to.equal('2f77668a9dfbf8d5848b9eeb4a7145ca94c6ed9236e4a773f6dcafa5132b2f91');
    });

    it("should encrypt strings and decrypt them back", function() {
        var crypted = Crypto.AES.encrypt("secret message", "some secret").toString();

        var decrypted = Crypto.AES.decrypt(crypted, "some secret").toString(Crypto.enc.Utf8);

        expect(decrypted).to.equal("secret message");
    })
});
