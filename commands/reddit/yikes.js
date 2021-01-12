/**
 * Alias for osha command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./osha')(msg, args);
}