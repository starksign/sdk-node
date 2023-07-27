let document = require('./document.js');
let signer = require('./signer/signer.js')
let signature = require('./signature/signature.js')

exports.sign = document.sign
exports.get = document.get
exports.signer = signer.Signer
exports.signature = signature.Signature
