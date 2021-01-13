const link = 'https://i.imgur.com/9h7eFti.png';

/**
 * Send the interdasting image
 * @param {Message} msg Message
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send(link);
}