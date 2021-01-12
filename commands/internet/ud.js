/**
 * Alias for urbandictionary command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./urbandictionary')(msg, args);
}