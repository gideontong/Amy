const subreddit = 'earthporn';

const { getRedditImage } = require('../lib/Internet');
const log = require('log4js').getLogger('amy');

/**
 * Returns a random photo from /r/earthporn
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    try {
        getRedditImage(function (data = 'Loading...') {
            msg.channel.send(data);
        }, subreddit);
    } catch (err) {
        log.error(`While trying to grab a Reddit /r/earthporn picture I got ${err}`);
    }
}