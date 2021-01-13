const subreddit = 'osha';

const { getRandomPost } = require('../../lib/Reddit');
const log = require('log4js').getLogger('amy');

/**
 * Returns a random OSHA image
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    // Special handler due to random posts not working
    getRandomPost(subreddit, function (data) {
        try {
            const posts = data.data[0].children;
            const post = posts[Math.floor(Math.random() * posts.length)];
            const link = post.url_overridden_by_dest;
            if (link) msg.channel.send(link);
            else {
                log.warn(`Failed to get /r/osha image, got: ${link}`);
                msg.channel.send('Something strange happened, try again?');
            }
        } catch (err) {
            log.error(`Failed to run osha, got: ${err}`);
        }
    });
}