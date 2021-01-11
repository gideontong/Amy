const subreddit = 'taiwanpics';

const { getRedditImage } = require('../lib/Internet');
const log = require('log4js').getLogger('amy');

/**
 * Returns a random photo from /r/TaiwanPics
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    try {
        getRedditImage(function (data = 'Loading...') {
            msg.channel.send(data);
        }, subreddit);
    } catch (err) {
        log.error(`While trying to grab a Reddit /r/TaiwanPics picture I got ${err}`);
    }
}