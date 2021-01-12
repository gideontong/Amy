/**
 * Alias for printemoji command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./printemoji')(msg, args);
}