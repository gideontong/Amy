const { setups } = require('../config/fun.json');

/**
 * Returns a random battlestation
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(setups[Math.floor(Math.random() * setups.length)]);
}