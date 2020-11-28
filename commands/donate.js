const link = 'https://ko-fi.com/gideontong';

/**
 * Donate command handler
 * @param {Client} client Discord server client
 * @param {Message} msg Message to execute
 * @param {Array} args Command arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(`You can donate to support development here: ${link}`);
}