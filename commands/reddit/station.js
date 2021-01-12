/**
 * Alias for battlestation command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./battlestation')(msg, args);
}