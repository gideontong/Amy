const host = 'www.reddit.com';
const endpoint = '/r/battlestations/random.json'

const { authenticatedGet } = require('../lib/Internet');
const log = require('log4js').getLogger('amy');

/**
 * Returns a random battlestation
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    try {
        authenticatedGet(function (data) {
            msg.channel.send(data);
        }, host, endpoint);
    } catch (err) {
        log.error(`While trying to grab a Reddit battlestation I got ${err}`);
    }
}