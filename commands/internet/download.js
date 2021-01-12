/**
 * Alias for downloadvideo command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./downloadvideo')(msg, args);
}