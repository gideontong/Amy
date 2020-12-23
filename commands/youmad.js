const link = 'https://i.imgur.com/p7SfsEa.png';

/**
 * Send the you mad bro meme
 * @param {Client} client Discord server client
 * @param {Message} msg Message
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(link);
}