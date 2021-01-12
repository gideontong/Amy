/**
 * Alias for earthpictures command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./earthpictures')(msg, args);
}
