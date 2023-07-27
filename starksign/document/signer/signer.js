const Resource = require('../../utils/resource.js').Resource;

class Signer extends Resource {
    /**
    * Signer object
    * 
    * @description Signers represent each of the parties that are expected to sign a document.
    * 
    * Parameters:
    * @param name [string]: Signer's name. ex: Jon Ygritte
    * @param contact [string]: Signer's contact information. ex: "jon@starksign.com"
    * @param method [string]: Signer's signature method. ex: "server", "token" or "link"
    * @param isSent [bool]: If True, the signer has been notified about the signature request. ex: True
    * @param status [string]: Signer status. ex: "pending", "success" or "canceled"
    * @param documentId [string]: ID of the Document that should be signed. ex: "6785678567856785"
    * @param tags [list of strings, default []]: list of strings for reference when searching for the Signer. ex: tags=["always-on-time"]
    * @param created [datetime.datetime]: creation datetime of the Signer. ex: datetime.datetime(2020, 3, 10, 10, 30, 0, 0)
    * @param updated [datetime.datetime]: latest update datetime for the Signer. ex: datetime.datetime(2020, 3, 10, 10, 30, 0, 0)
    */

    constructor({name = null, contact = null, method = null, isSent = null, status = null, documentId = null, tags = null, created = null, updated = null})
    {
        super(id);
        this.name = name;
        this.contact = contact;
        this.method = method;
        this.isSent = isSent;
        this.status = status;
        this.documentId = documentId;
        this.tags = tags;
        this.created = created;
        this.updated = updated;
    }
}

exports.Signer = Signer
exports.subResource = {'class': Signer, 'name': 'Signer'}