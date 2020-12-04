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
            if (res.statusCode === 301 || res.statusCode === 302) {
                location = Internet.extractURL(res.headers.location);
                options.host = location.host;
                options.endpoint = location.path;
                Internet.doRequest(options, toExecute);
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
        req.write(data);
        req.end();
    }

    /**
     * Get a random Reddit image from an array of subreddits
     * and will take up to 5 tries before erroring out
     * @param {function} success Success function to call
     * @param {Array} subreddits Array of subreddits
     * @param {int} attempts Number of attempts
     */
    static getRedditImage(success, subreddits, attempts = 0) {
        try {
            if (attempts > 5) {
                success('Error: failed too many times trying to get an image!');
                return;
            }
            const host = 'www.reddit.com';
            var subreddit;
            if (typeof (subreddits) == 'string') {
                subreddit = subreddits;
            } else if (Array.isArray(subreddits)) {
                subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
            } else {
                success('Error: something strange happened!');
                return;
            }
            const endpoint = `/r/${subreddit}/random.json`;
            Internet.authenticatedGet(function (data) {
                if (data
                    && data.length > 0
                    && data[0]
                    && data[0].data
                    && data[0].data.children
                    && data[0].data.children.length > 0
                    && data[0].data.children[0].data
                    && data[0].data.children[0].data.url_overridden_by_dest) {
                    const link = data[0].data.children[0].data.url_overridden_by_dest;
                    if (link.startsWith('https://i.')) {
                        success(link);
                    } else {
                        success(`This link isn't supported yet, but you can view it in the browser: ${link}`);
                    }
                    return;
                } else {
                    Internet.getRedditImage(subreddits, attempts++);
                    return;
                }
            }, host, endpoint, {}, {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
            });
        } catch (err) {
            console.error(`Error: trying to get image, got ${err}`);
        }
    }

    static extractURL(URL) {
        let match = URL.match(/^(([^:\/?#]+:)?(?:\/\/((?:([^\/?#:]*):([^\/?#:]*)@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/);
        return {
            'host': match[3],
            'path': match[8] || (match[1] ? "/" : "")
        };
    }
}

module.exports = Internet;