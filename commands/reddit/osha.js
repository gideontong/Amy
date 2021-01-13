const subreddit = 'osha';

const { postToImage, getRandomPost } = require('../../lib/Reddit');
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
            const posts = data.data.children;
            const post = posts[Math.floor(Math.random() * posts.length)].data;
            if (post) {
                const link = postToImage(post);
                msg.channel.send(link);
            }
            else {
                log.warn(`Failed to get /r/osha image, got: ${link}`);
                msg.channel.send('Something strange happened, try again?');
            }
        } catch (err) {
            log.error(`Failed to run osha, got: ${err}`);
        }
    });
}