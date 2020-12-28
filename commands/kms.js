/**
 * Alias for suicide command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./suicide')(msg, args);
}