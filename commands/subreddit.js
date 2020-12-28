const link = 'https://www.reddit.com/r/AmyBot/';

/**
 * Get a link to the subreddit
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send(link);
}