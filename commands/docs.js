const link = 'https://github.com/gideontong/Amy/blob/master/docs/README.md';

/**
 * Sends a link for the Discord app docs
 * @param {Client} client Discord server client
 * @param {Message} msg Message to execute
 * @param {Array} args Arguments to execute
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(`You can read Amy's documentation here: ${link}`);
}