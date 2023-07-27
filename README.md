# Stark Bank Node SDK

Welcome to the Stark Sign Node SDK! This tool is made for Node
developers who want to easily integrate with our API.
This SDK version is compatible with the Stark Sign API v2.

# Introduction

# Index

- [Introduction](#introduction)
    - [Supported Node versions](#supported-node-versions)
    - [API documentation](#stark-sign-api-documentation)
    - [Versioning](#versioning)
- [Setup](#setup)
    - [Install our SDK](#1-install-our-sdk)
    - [Setting up the environment](#2-setting-up-the-environment)
    - [Setting up the error language](#3-setting-up-the-error-language)
- [Signatures](#signatures)
    - [Link](#1-link-signatures)
    - [Token](#2-token-signatures)
    - [Server](#3-server-signatures) 
- [Usage](#usage)
    - [Server signatures](#server-signatures): Sign a document automatically using the server method
    - [Token signatures](#token-signatures): Sign a document on behalf of a person via SMS/email tokens
- [Handling errors](#handling-errors)
- [Help and Feedback](#help-and-feedback)

# Supported Node Versions

This library supports the following Node versions:

* Node 10+

## Stark Sign API documentation

Feel free to take a look at our [API docs](https://www.starksign.com/docs/api).

## Versioning

This project adheres to the following versioning pattern:

Given a version number MAJOR.MINOR.PATCH, increment:

- MAJOR version when the **API** version is incremented. This may include backwards incompatible changes;
- MINOR version when **breaking changes** are introduced OR **new functionalities** are added in a backwards compatible manner;
- PATCH version when backwards compatible bug **fixes** are implemented.

# Setup

## 1. Install our SDK

1.1 To install the package with npm, run:

```sh
npm install starksign
```

## 2. Setting up the environment

You must configure the SDK to use one of our two available environments:

- `sandbox`: This is a testing environment where you can get to know and test your system's interactions with ours.
- `production`: This is real World, where your actions will have a real impact on your operations.

To do this, assign it while your application is booting: 

```javascript
const starksign = require('starksign')

starksign.environment = "sandbox"  # or production
```

On all following examples, we will assume a default user has been set.

## 3. Setting up the error language

The error language (and timeout) can also be set in the same way as the default user:

```javascript
const starksign = require('starksign')

starksign.language = "en-US"
```

Language options are "en-US" for English and "pt-BR" for Brazilian Portuguese. English is the default.

# Signatures

There are 3 ways a party can sign a document: 

## 1. Link signatures

Using this method, the signer will receive a link (by email, SMS, etc.),
which will open the document link with a validated signature button.
By reading the document and clicking on the button, the person's signature will be registered.
This method doesn't require usage of this SDK and its functions.

## 2. Token signatures

Using this method, you are expected to provide an interface (via browser, app, etc.) to the signer,
who will read the document, receive a token (via email, SMS, etc.) and then inform it to the interface to sign it.

## 3. Server signatures

Using this method, your service will receive a request on the informed endpoint.
This request will carry a private key, which should be used to sign the document after its validation.

## Server signatures

If you need a server/system to automatically sign the documents, you can follow these steps:

### 1. Receive a SignatureRequest on your endpoint

If your system is expected to sign documents that are being generated,
be prepared to receive calls to the informed endpoint and parse them accordingly before you proceed with the signature:

```javascript
const starksign = require('starksign');
const express = require('express')
const app = express()

app.use(express.raw({type: "*/*"}));

const port = 3000
app.post('/', async (req, res) => {
    try {
        let signatureRequest = await starksign.signatureRequest.parse({
            content: req.body.toString(),
            signature: req.headers['digital-signature']
        });
        console.log(signatureRequest)
        res.end()
    }
    catch (err) {
        console.log(err)
        res.status(400).end()
    }
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

### 2. Get the document data before signing

Once you receive a signature request, fetch the referenced document to check it out before signing it:

```javascript
const starksign = require('starksign');

let document = await starksign.document.get(signatureRequest.documentId)

print(document)
```

### 3. Sign the document

Once you have the SignatureRequest and Document and your system understands the signature is due, you can sign it:

```javascript
const starksign = require('starksign');

let signature = await starksign.document.sign({
  id: document.id,
  content: document.content,
  signerId: signatureRequest.signerId,
  privateKey: signatureRequest.privateKey,
})

console.log(signature)
```

## Token signatures

If you expect your users to sign documents using the tokens they receive via email, SMS, etc.,
your interface (which should already have the document data loaded) should be able to receive their tokens and sign on
their behalf by doing this:

### 1. Sign the document

This is the same method used before, but the token is provided instead of the privateKey:

```javascript
const starksign = require('starksign');

// since your interface is asking for a specific document's signature, it should already know the document and signer

const document = await getDocument()  //this is not an SDK function, you should implement this to get the Document data 

const signer = await getSigner() // this is not an SDK function, you should implement this to get the Signer data

const token = await getUserInput() // this is not an SDK function, you should implement this to get the user input

let signature = await starksign.document.sign({
  id: document.id,
  content: document.content,
  signerIslad: signer.id,
  token: token,
})

console.log(signature)
```

# Handling errors

The SDK may raise one of four types of errors: __InputErrors__, __InternalServerError__, __UnknownError__, __InvalidSignatureError__

__InputErrors__ will be raised whenever the API detects an error in your request (status code 400).
If you catch such an error, you can get its elements to verify each of the
individual errors that were detected in your request by the API.
For example:

```javascript
const starksign = require('starksign');

(async() => {
    try{
    let signature = await starksign.document.sign({
        id: "7a8361ec097543daa48acd5312471cf5",
        content: "<meta charset='utf-8'><page size='A4'>Test</page>",
        signerId: "2345234523452345",
        token: "abcd1234",
    });
    } catch (e) {
        if (e instanceof InputErrors) {
            for (error of e.errors) {
                console.log(error.code, error.message);
            }
        } else {
            throw e;
        }
    }
})();
```

__InternalServerError__ will be raised if the API runs into an internal error.
If you ever stumble upon this one, rest assured that the development team
is already rushing in to fix the mistake and get you back up to speed.

__UnknownError__ will be raised if a request encounters an error that is
neither __InputErrors__ nor an __InternalServerError__, such as connectivity problems.

__InvalidSignatureError__ will be raised specifically by starksign.event.parse()
when the provided content and signature do not check out with the Stark Sign public
key.

# Help and Feedback

If you have any questions about our SDK, just send us an email.
We will respond you quickly, pinky promise. We are here to help you integrate with us ASAP.
We also love feedback, so don't be shy about sharing your thoughts with us.

Email: help@starkbank.com
