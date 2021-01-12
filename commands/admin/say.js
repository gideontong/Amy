/**
 * Alias for tell command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./tell')(msg, args);
}