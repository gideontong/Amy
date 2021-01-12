const { rules } = require('../../config/messages.json');

/**
 * Returns 708 server rules
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send(rules);
}