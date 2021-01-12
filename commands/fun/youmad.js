const link = 'https://i.imgur.com/p7SfsEa.png';

/**
 * Send the you mad bro meme
 * @param {Message} msg Message
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send(link);
}