const link = 'https://github.com/gideontong/Amy/releases';

/**
 * Returns the changelog
 * @param {Message} msg Message to execute
 * @param {Array} args Arguments to execute
 */
module.exports = async (msg, args) => {
    msg.channel.send(`You can find the latest changes here: ${link}`);
}