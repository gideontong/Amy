/**
 * Alias for coinflip command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./coinflip')(msg, args);
}