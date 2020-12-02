const version = require('../package.json').version;
const defaultUA = `AmyBot/${version} by Gideon <gideon@gideontong.com>`;

const { stringify } = require('querystring');
const https = require('https');

/**
 * Common internet functions
 * @class
 */
class Internet {
    /**
     * Call an internet method
     * @param {str} host Server to hit
     * @param {str} endpoint URL to hit
     * @param {str} method URL method to use
     * @param {*} query Payload
     * @param {function} success Function call on success
     */
    static request(host, endpoint, method, query, success) {
        var dataString = JSON.stringify(query);
        var headers = {};

        if (method == 'GET') {
            endpoint += '?' + stringify(query);
        }
        else {
            headers = {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length,
                'User-Agent': defaultUA
            };
        }
        var options = {
            host: host,
            path: endpoint,
            method: method,
            headers: headers
        };

        Internet.doRequest(options, success);
    }

    /**
     * GET with more options
     * @param {function} success Function call on success
     * @param {str} host Server to hit
     * @param {str} endpoint URL to hit
     * @param {*} query Payload
     * @param {*} headers Headers
     */
    static authenticatedGet(success, host, endpoint, query, headers = {}) {
        headers['User-Agent'] = defaultUA;

        const options = {
            host: host,
            path: endpoint += '?' + stringify(query),
            method: 'GET',
            headers: headers
        };

        Internet.doRequest(options, success);
    }

    /**
     * POST with more options
     * @param {function} success Function call on success
     * @param {str} host Server to hit
     * @param {str} endpoint URL to hit
     * @param {*} data Payload
     * @param {*} query Queries
     * @param {*} headers Headers
     */
    static authenticatedPost(success, host, endpoint, data, query = {}, headers = {}) {
        const dataString = JSON.stringify(data);
        headers['Content-Type'] = 'application/json';
        headers['Content-Length'] = dataString.length;
        headers['User-Agent'] = defaultUA;

        const options = {
            host: host,
            path: endpoint += '?' + stringify(query),
            method: 'POST',
            headers: headers
        };

        Internet.doRequest(options, success);
    }

    /**
     * Do an any type request
     * @param {*} options Request object properties
     * @param {function} toExecute Function call to execute
     */
    static doRequest(options, toExecute) {
        var data = '';
        var req = https.request(options, function (res) {
            res.setEncoding('utf-8');
            var responseString = '';
            res.on('data', function (data) {
                responseString += data;
            });
            res.on('end', function () {
                var responseObject;
                try {
                    console.log(responseString);
                    responseObject = JSON.parse(responseString);
                } catch {
                    console.error(`Tried to get data, got ${responseString}`);
                }
                toExecute(responseObject);
            });
        });
        req.write(data);
        req.end();
    }
}

module.exports = Internet;