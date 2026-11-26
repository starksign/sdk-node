const assert = require("assert");
const starkcore = require("starkcore");
const starksign = require("../../index");
const { Ecdsa, PrivateKey } = require("starkbank-ecdsa");


starksign.environment = "sandbox"


describe('TestSignatureRequest', function(){
    it('test-parse-consecutive-requests-in-same-process', async () => {
        let starkKey = new PrivateKey();
        starkcore.cache['stark-public-key'] = starkKey.publicKey();

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
    })
})
