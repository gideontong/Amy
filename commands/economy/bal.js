/**
 * Alias for balance command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./balance')(msg, args);
}