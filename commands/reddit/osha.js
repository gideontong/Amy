const subreddit = 'osha';

const { getRandomImage } = require('../../lib/Reddit');
const log = require('log4js').getLogger('amy');

/**
 * Returns a random OSHA image
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    return msg.channel.send('This command has been temporarily disabled due to high error rates.');
    try {
        getRandomImage(function (data = 'Loading...') {
            msg.channel.send(data);
        }, subreddit);
    } catch (err) {
        log.error(`While trying to grab a Reddit /r/OSHA picture I got ${err}`);
    }
}