const SubResource = require('../utils/subResource').SubResource;
const parseObjects = require('../utils/parse.js').parseAndVerify;


class SignatureRequest extends SubResource {
/**
 * SignatureRequest object
 * 
 * @description SignatureRequests are received when a signer with the "server" method is called to sign a specific document.
 * You should use the signaturequest.parse() method safely verify if this is a legitimate request and then use its
 * information to sign the document, if adequate.
 * 
 * Parameters:
 * @param signerId [string]: ID of the document signer that has been requested. ex: "6785678567856785"
 * @param documentId [string]: ID of the document that is being signed. ex: "5678567856785678"
 * @param privateKey [string]: ECDSA private key generated specifically for the signer to sign this document. ex: "-----BEGIN EC PRIVATE KEY-----\nMHQCAQEEICldfevoktjOcGGbeLZFn4VjmQAI7H4A2o3XwI6nA1mtoAcGBSuBBAAK\noUQDQgAEb0YLOXkxyF266wSD/yA0NBKVclBuyBaIEsvYnT6MCUppngXUMgrzqA+A\nXgUSnsWcPSy+mhnDJF6qtEaXHyoidQ==\n-----END EC PRIVATE KEY-----"
 */    

    constructor({signerId = null, documentId = null, privateKey = null})
    {
        super();
        this.signerId = signerId;
        this.documentId = documentId;
        this.privateKey = privateKey;
    }
}

exports.SignatureRequest = SignatureRequest;
exports.resource = {"class": exports.SignatureRequest, "name": "SignatureRequest"}

exports.parse = async function ({content, signature}) {
    /**
    * Create a single verified SignatureRequest object from a content string
    * 
    * @description Create a single SignatureRequest object from a content string received from a handler listening at the request url.
    * If the provided digital signature does not check out with the StarkSign public key, a
    * starksign.error.InvalidSignatureError will be raised.
    * 
    * Parameters (required):
    * @param content [string]: response content from request received at user endpoint (not parsed)
    * @param signature [string]: base-64 digital signature received at response header "Digital-Signature"
    * 
    * Parameters (optional):
    * @param user [Organization/Project object, default None]: Organization or Project object. Not necessary if starksign.user was set before function call.
    * 
    * Return:
    * @return Parsed SignatureRequest object
    */

    return parseObjects(exports.resource, content, signature)
}
