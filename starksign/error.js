class StarkSignError extends Error {
    constructor(message) {
        super(message);
    }
}

class InputError extends StarkSignError {
    constructor(code, message, status = 400) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

class InputErrors extends StarkSignError {
    constructor(content, status = 400) {
        super(JSON.stringify(content));
        this.status = status;
        this.errors = [];
        let errors = content['errors'];
        for (let error of errors) {
            this.errors.push(new InputError(error['code'], error['message'], status));
        }
    }
}

class InternalServerError extends StarkSignError {
    constructor(content, status = 500) {
        super(JSON.stringify(content));
        this.status = status;
    }
}

class InvalidSignatureError extends StarkSignError {
    constructor(message) {
        super(message);
    }
}

exports.InputError = InputError;
exports.InputErrors = InputErrors;
exports.InternalServerError = InternalServerError;
exports.InvalidSignatureError = InvalidSignatureError;
