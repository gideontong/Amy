const version = require('../package.json').version;
const defaultUA = `AmyBot/${version} by Gideon <gideon@gideontong.com>`;
const googleHost = 'www.googleapis.com';
const googleEndpoint = '/customsearch/v1';

const { google } = require('../config/secrets.json');
const { stringify } = require('querystring');
const http = require('http');
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
    static authenticatedGet(success, host, endpoint, query = {}, headers = {}) {
        if (!headers['User-Agent']) headers['User-Agent'] = defaultUA;

        const options = {
            host: host,
            path: endpoint + '?' + stringify(query),
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
            path: endpoint + '?' + stringify(query),
            method: 'POST',
            headers: headers
        };

        Internet.doRequest(options, success, 0, dataString);
    }

    /**
     * Do an any type request
     * @param {*} options Request object properties
     * @param {function} toExecute Function call to execute
     * @param {int} attempts Attempts to run
     * @param {Object} data Data to POST
     */
    static doRequest(options, toExecute, attempts = 0, data = null) {
        if (attempts > 5) return;
        var req = https.request(options, function (res) {
            if (res.statusCode === 301 || res.statusCode === 302) {
                Internet.doRequest(res.headers.location, toExecute, attempts + 1);
                return;
            } else {
                res.setEncoding('utf-8');
                var responseString = '';
                res.on('data', function (data) {
                    responseString += data;
                });
                res.on('end', function () {
                    var responseObject;
                    try {
                        responseObject = JSON.parse(responseString);
                    } catch {
                        console.error(`Tried to get data, got ${responseString}`);
                    }
                    toExecute(responseObject);
                });
            }
        });
        if (data) req.write(data);
        req.end();
    }

    /**
     * Do an HTTP call instead of HTTPS
     * @param {function} success Function to call on success
     * @param {str} host Server to hit
     * @param {str} endpoint URL to hit
     * @param {*} data Data to upload
     */
    static simplePost(success, host, port, endpoint, data) {
        const dataString = JSON.stringify(data);
        const options = {
            host: host,
            port: port,
            path: endpoint,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length
            }
        };

        var req = http.request(options, function (res) {
            res.setEncoding('utf-8');
            var response = '';

            res.on('data', function (input) {
                response += input;
            });

            res.on('end', function () {
                var responseObject;

                try {
                    responseObject = JSON.parse(response);
                } catch { }

                success(responseObject);
            });

            res.on('error', function (e) { });

        });

        req.write(dataString);

        req.on('error', function (e) { });

        req.end();
    }

    /**
     * Does a Google search and returns up to 10 results
     * @param {function} success Function to return results to
     * @param {String} query What to search on the internet
     * @param {Boolean} safe Whether or not to use SafeSearch
     * @param {Boolean} images Whether or not to find images
     * @param {Number} results How many results to return (1 to 10)
     */
    static getGoogleSearch(success, query, safe = true, images = false, results = 3) {
        if (!(success && query)) {
            console.error('Internet.getGoogleSearch had insufficient parameters');
            return;
        }
        let options = {
            q: query,
            key: google.key,
            cx: google.engine
        };
        if (images) options['searchType'] = 'image';
        if (safe) options['safe'] = 'active';
        if (results < 0 || results > 10) {
            console.error(`Internet.getGoogleSearch does not support ${results} results`);
            return;
        } else {
            options['num'] = results;
        }
        Internet.authenticatedGet(function (data) {
            var results = {
                time: data.searchInformation.formattedSearchTime,
                count: data.searchInformation.formattedTotalResults,
                results: data.items
            };
            if (data.spelling) results['corrected'] = data.spelling.correctedQuery;
            success(results);
        }, googleHost, googleEndpoint, options);
    }
}

module.exports = Internet;