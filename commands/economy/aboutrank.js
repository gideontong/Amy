/**
 * Alias for rank command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./rank')(msg, args);
}