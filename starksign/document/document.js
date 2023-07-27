const sha256 = require("js-sha256");
const Ecdsa = require('starkbank-ecdsa').Ecdsa;
const PrivateKey = require('starkbank-ecdsa').PrivateKey;
const EcdsaCurve = require("starkbank-ecdsa/ellipticcurve/curve");
const Resource = require('../utils/resource').Resource;
const rest = require('../utils/rest.js');
const parseObjects = require('../utils/parse.js').parseObjects;
const signerSubresource = require('./signer/signer.js').subResource;
const signatureSubresource = require('./signature/signature.js').subResource;

class Document extends Resource {
    /**
    * Document object
    * 
    * @description Documents represent the contracts that should be signed by all parties.
    * 
    * Parameters:
    * @param content [string]: HTML content of the document. This is also the message that should be signed by the provided ECDSA private key.
    * @param status [string]: Document status. ex: "pending", "success", "canceled" or "expired"
    * @param signers [list of document.Signers]: list with parties that are or were expected to sign the contract.
    * @param signatures [list of document.Signatures]: list with current Signatures the contract has received.
    */

    constructor(content = null, status = null, signers = null, signatures = null){
        super();
        this.content = content;
        this.status = status;
        this.signers = parseObjects(signers, signerSubresource, Signer);
        this.signatures = parseObjects(signatures, signatureSubresource, Signature);
    }
}

exports.resource = {'class': Document, 'name': 'Document'}

exports.get = async function (id) {
    /**
    * Retrieve a specific Document
    * 
    * @description Receive a single Document object previously created in the Stark Sign API by its id
    * 
    * Parameters (required):
    * @param id [string]: object unique id. ex: "d186044b38be41598aaccfc5770b991a"
    * 
    * Return:
    * @return Document object with updated attributes
    */

    return rest.getId(exports.resource, id)
}

exports.sign = async function ({id, content, signerId, privateKey, token} = {}) {
    /**
    * Sign a specific Document
    * 
    * @description Add a Signer's Signature to a specific document. Either a private_key or a token must be informed.
    * Parameters (required):
    * @param id [string]: ID of the Document that is being signed. ex: "d186044b38be41598aaccfc5770b991a"
    * @param content [string]: HTML content of the document that is being signed.
    * @param signerId [string]: ID of the document Signer that is creating the Signature. ex: "6785678567856785"
    * 
    * Parameters (conditionally-required):
    * @param privateKey [string]: Private key PEM content that was received on the registered endpoint. Only valid for "server" signatures. ex: "-----BEGIN EC PRIVATE KEY-----\nMHQCAQEEICldfevoktjOcGGbeLZFn4VjmQAI7H4A2o3XwI6nA1mtoAcGBSuBBAAK\noUQDQgAEb0YLOXkxyF266wSD/yA0NBKVclBuyBaIEsvYnT6MCUppngXUMgrzqA+A\nXgUSnsWcPSy+mhnDJF6qtEaXHyoidQ==\n-----END EC PRIVATE KEY-----"
    * @param token [string]: Token received via email, SMS, etc. by a non-server signer. ex: "a8B1kxJ"
    * 
    * Return:
    * @return Signature object
    */

    if (privateKey != null) {
        privateKey = PrivateKey.fromPem(privateKey)
    }
    if (privateKey == null){
        privateKey = new PrivateKey(EcdsaCurve.secp256k1, BigInt("0x" + Array.from(Uint8Array.from(Buffer.from(sha256.sha256(`${id}:${signerId}:${token}`).toString(), 'hex'))).map(byte => byte.toString(16).padStart(2, '0')).join('')))
    }
    return rest.postSubResource(exports.resource, id, signatureSubresource, {"signerId": signerId, "signature": Ecdsa.sign(content, privateKey).toBase64()})
}
