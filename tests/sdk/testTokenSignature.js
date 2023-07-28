const assert = require("assert");
const starksign = require("../../starksign/index");


starksign.environment = "sandbox"


describe('TestTokenSignature', function(){
    this.timeout(20000);
    it('test-success', async () => {

        let token = "EaYSQiZe"
        let document = await starksign.document.get("00e49e95f1ef486d9407418fee88e153")
        console.log(document)

        let signersByContact = {}
        for (let signer of document.signers) {
            signersByContact[signer.contact] = signer;
        }
        let signer = signersByContact["+55 (11) 99999-9999"]

        let signature = await starksign.document.sign({
            id: document.id, 
            content: document.content,
            signerId: signer.id,
            token: token
        })
        console.log(signature)
        
        assert(typeof signature.signerId == 'string')
    })
})
