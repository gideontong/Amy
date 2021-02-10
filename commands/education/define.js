/**
 * Alias for dictionary command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./dictionary')(msg, args);
}