const SubResource = require('core-node').SubResource;


class Signature extends SubResource {
    /**
    * Signature object
    * @description Whenever a Document is signed by any of its Signers, a document Signature object is registered.
    * When all Signatures are received, the Document status changes to "success".
    * 
    * Parameters:
    * @param signerId [string]: ID of the document signer that has created this Signature. ex: "6785678567856785"
    * @param name [string]: Document signer's name. ex: name="Edward Stark"
    * @param contact [string]: signer's contact information. ex: "tony@starkinfra.com"
    * @param signature [string]: base-64 ECDSA digital signature generated to sign the document. ex: "MEUCIQD6cymQq40/06XuIelkv2t9qd9rPACooRH8faCB8SuPIQIgOqIil/1Vm/jni8eTDsoO5ytdoDitZocm3KSLzUYHCrQ\u003d"
    * @param publicKey [string]: public key that was used to validate the signature against the HTML content of the document. ex: "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEgHEBU5JNNgoJ1pWNUaEM7PvRbDvvNw3W\n+rZPqVhor/2vEqB5+fpYjTQp3EdGlKtEtSizeHsL9Vwm5MSt3CQrzA\u003d\u003d\n-----END PUBLIC KEY-----"
    * @param ip [string]: IP that sent the signature to Stark Infra. ex: "2804:14c:6a:85d3:b8a3:ddb4:a4e9:e11e"
    * @param created [string]: creation datetime for the Signature. ex: '2020-03-10 10:30:00.000'
    */

    constructor({signerId = null, name = null, contact = null, signature = null, publicKey = null, ip = null, created = null}){
        super();
        this.signerId = signerId;
        this.name = name;
        this.contact = contact;
        this.signature = signature;
        this.publicKey = publicKey;
        this.ip = ip;
        this.created = created;
    }
}

exports.Signature = Signature
exports.subResource = {'class': Signature, 'name': 'Signature'}
