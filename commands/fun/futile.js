const { sankeys } = require('../config/fun.json');

/**
 * Yes, life is futile
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async(client, msg, args) => {
    msg.channel.send(sankeys[Math.floor(Math.random() * sankeys.length)]);
}