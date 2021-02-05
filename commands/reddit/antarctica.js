const subreddit = 'antarcticapics';

const { getRandomImage } = require('../../lib/Reddit');
const log = require('log4js').getLogger('amy');

/**
 * Returns a random photo from /r/AntarcticaPics
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    try {
        getRandomImage(function (data = 'Loading...') {
            msg.channel.send(data);
        }, subreddit);
    } catch (err) {
        log.error(`While trying to grab a Reddit /r/AntarcticaPics picture I got ${err}`);
    }
}