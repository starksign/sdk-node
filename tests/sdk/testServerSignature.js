const assert = require("assert");
const starksign = require("../../starksign/index");

starksign.environment = "sandbox"

describe('TestServerSignature', function(){
    this.timeout(20000);
    it('test-success', async () => {
        
        let signatureRequest = await starksign.signatureRequest.parse({
            content: '{"documentId": "2a7aa76708cc49a98b49c15fc48c7b59", "privateKey": "\\n-----BEGIN EC PRIVATE KEY-----\\nMHQCAQEEIG1DmjoAC5opYa/4757gkdsnoPUimzC27gxlqaqHY/zGoAcGBSuBBAAK\\noUQDQgAE4rTiM4ciU4PwMLa7GsiTIuWrB2vV8aL+304M0ItOH/c02+Nm7XLFWea/\\nV46mHdW89VK7mzb0t+IIjYr/m+Dslw==\\n-----END EC PRIVATE KEY-----\\n", "signerId": "6195474604228608"}',
            signature: 'MEYCIQDvGDB6jce3zJAxkW49t7DIVvcDzTPvDcuSRUky0ory+wIhAJhwjWpHdDTVft2M/xX0bCFp+QdWEcGyZjzHEjd8EUSM'
        })

        console.log(signatureRequest)

        let document = await starksign.document.get(signatureRequest.documentId)

        console.log(document)

        let signature = await starksign.document.sign({
            id: document.id, 
            content: document.content,
            signerId: signatureRequest.signerId,
            privateKey: signatureRequest.privateKey
        })

        console.log(signature)

        assert(typeof signature.signerId == "string")
    })
})
