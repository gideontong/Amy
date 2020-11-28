const link = 'https://github.com/gideontong/Amy/blob/master/docs/CHANGELOG.md';

/**
 * Returns the changelog
 * @param {Client} client Discord server client
 * @param {Message} msg Message to execute
 * @param {Array} args Arguments to execute
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(`You can find the latest changes here: ${link}`);
}