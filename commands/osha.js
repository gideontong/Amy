const subreddit = 'osha';

const { getRedditImage } = require('../lib/Internet');
const log = require('log4js').getLogger('amy');

/**
 * Returns a random creepy PM
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    try {
        getRedditImage(function (data = 'Loading...') {
            msg.channel.send('A quick tutorial on how to be creepy:')
            msg.channel.send(data);
        }, subreddit);
    } catch (err) {
        log.error(`While trying to grab a Reddit /r/OSHA picture I got ${err}`);
    }
}