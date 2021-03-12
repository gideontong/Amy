/**
 * Alias for 8ball command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
 module.exports = async (msg, args) => {
    require('./8ball')(msg, args);
}