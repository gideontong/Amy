/**
 * Alias for youmad command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./youmad')(msg, args);
}