const timeout = 2000
const apiVersion = 'v2'
const language = 'en-US'
const sdkVersion = '2.13.0'
const starkHost = require('core-node').starkHost;
const host = starkHost.sign
const rest = require('core-node').rest;
const starksign = require('../../index.js');
let user = require('core-node').PublicUser;


exports.getId = async function (resource, id, { ...query } = {}) {
    user = new user({environment: starksign.environment});
    return rest.getId(
        sdkVersion,
        host,
        apiVersion,
        user,
        resource,
        id,
        language,
        timeout,
        query
    );
};

exports.postSubResource = async function (resource, id, subResource, payload) {
    user = new user({environment: starksign.environment});
    return rest.postSubResource(
        sdkVersion,
        host,
        apiVersion,
        user,
        id,
        subResource,
        resource,
        payload,
        language,
        timeout
    );
};

exports.apiVersion = 'v2'
exports.sdkVersion = '2.13.0'
exports.host = starkHost.infra;
exports.language = 'en-US';
exports.timeout = 2000
