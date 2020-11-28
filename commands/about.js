/**
 * Alias for help command
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (client, msg, args) => {
    require('./help')(client, msg, args);
}