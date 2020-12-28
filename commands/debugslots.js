/**
 * Debugging slots command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send('Starting slots in DEBUG mode. Your balance will not be affected.');
    require('./slots')(msg, args);
}