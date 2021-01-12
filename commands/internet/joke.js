const host = 'icanhazdadjoke.com';
const endpoint = '/';

const { authenticatedGet } = require('../lib/Internet');

/**
 * You aren't funny...
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    authenticatedGet(function (data) {
        if (data && data['joke']) {
            msg.channel.send(data['joke']);
        }
    }, host, endpoint, {}, {
        'Accept': 'application/json'
    });
}