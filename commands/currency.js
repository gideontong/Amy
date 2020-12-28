/**
 * Alias for exchangerate command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./exchangerate')(msg, args);
}