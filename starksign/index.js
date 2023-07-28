exports.version = '0.0.1';
exports.environment = null;
exports.cache = {};
exports.user = null;
exports.language = "en-US";

exports.setUser = function (user) {
    exports.user = user;
}

exports.getUser = function () {
    return exports.user;
}

exports.setLanguage = function (language) {
    let acceptedLanguages = ["en-US", "pt-BR"];
    if (!acceptedLanguages.includes(language)) {
        throw new Exception("language must be one of " . join(", ", acceptedLanguages));
    }
    exports.language = language;
}

exports.getLanguage = function () {
    return exports.language
}

// Modoles
exports.document = require('./document')
exports.signatureRequest = require('./signaturerequest')
