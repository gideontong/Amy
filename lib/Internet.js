const { stringify } = require('querystring');
const https = require('https');

/**
 * Common internet functions
 * @class
 */
class Internet {
    /**
     * Call an internet method
     * @param {str} endpoint URL to hit
     * @param {str} method URL method to use
     * @param {JSON} data Payload
     * @param {function} success Function call on success
     */
    static request(host, endpoint, method, data, success) {
        var dataString = JSON.stringify(data);
        var headers = {};

        if (method == 'GET') {
            endpoint += '?' + stringify(data);
        }
        else {
            headers = {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length
            };
        }
        console.log(endpoint);
        var options = {
            host: host,
            path: endpoint,
            method: method,
            headers: headers
        };

        var req = https.request(options, function (res) {
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
                success(responseObject);
            });
        });

        req.write(dataString);
        req.end();
    }
}

module.exports = Internet;