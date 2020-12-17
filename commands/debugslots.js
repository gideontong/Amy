/**
 * Debugging slots command
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send('Starting slots in DEBUG mode. Your balance will not be affected.');
    require('./slots')(client, msg, args);
}