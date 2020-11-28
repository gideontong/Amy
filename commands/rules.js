const { rules } = require('../config/messages.json');

/**
 * Returns 708 server rules
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(rules);
}