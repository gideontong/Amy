/**
 * Alias for awww command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./awww')(msg, args);
}