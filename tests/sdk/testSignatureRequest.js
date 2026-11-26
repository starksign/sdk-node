const assert = require("assert");
const starkcore = require("starkcore");
const starksign = require("../../index");
const { Ecdsa, PrivateKey } = require("starkbank-ecdsa");


starksign.environment = "sandbox"


describe('TestSignatureRequest', function(){
    it('test-parse-consecutive-requests-in-same-process', async () => {
        let starkKey = new PrivateKey();
        starkcore.cache['stark-public-key'] = starkKey.publicKey();

        try {
            for (let signerId of ["6195474604228608", "5282572200312832"]) {
                let content = JSON.stringify({
                    documentId: "2a7aa76708cc49a98b49c15fc48c7b59",
                    privateKey: new PrivateKey().toPem(),
                    signerId: signerId,
                });
                let signatureRequest = await starksign.signatureRequest.parse({
                    content: content,
                    signature: Ecdsa.sign(content, starkKey).toBase64(),
                });
                assert.equal(signatureRequest.signerId, signerId);
                assert.equal(signatureRequest.documentId, "2a7aa76708cc49a98b49c15fc48c7b59");
            }
        } finally {
            delete starkcore.cache['stark-public-key'];
        }
    })

    it('test-parse-fetches-public-key-with-public-user-and-rejects-foreign-signature', async () => {
        let starkKey = new PrivateKey();
        let originalGetPublicKey = starkcore.rest.getPublicKey;
        let users = [];
        starkcore.rest.getPublicKey = async (sdkVersion, host, apiVersion, user) => {
            users.push(user);
            return starkKey.publicKey().toPem();
        };
        delete starkcore.cache['stark-public-key'];

        try {
            let content = JSON.stringify({
                documentId: "2a7aa76708cc49a98b49c15fc48c7b59",
                privateKey: new PrivateKey().toPem(),
                signerId: "6195474604228608",
            });
            let signatureRequest = await starksign.signatureRequest.parse({
                content: content,
                signature: Ecdsa.sign(content, starkKey).toBase64(),
            });
            assert.equal(signatureRequest.signerId, "6195474604228608");
            await assert.rejects(
                starksign.signatureRequest.parse({
                    content: content,
                    signature: Ecdsa.sign(content, new PrivateKey()).toBase64(),
                }),
                /do not match Stark public key/,
            );
        } finally {
            starkcore.rest.getPublicKey = originalGetPublicKey;
            delete starkcore.cache['stark-public-key'];
        }

        assert.equal(users.length, 2);
        assert.ok(users.every(user => user instanceof starkcore.PublicUser && user.environment === "sandbox"));
    })
})
