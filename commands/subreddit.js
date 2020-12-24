const link = 'https://www.reddit.com/r/AmyBot/';

/**
 * Get a link to the subreddit
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async(client, msg, args) => {
    msg.channel.send(link);
}