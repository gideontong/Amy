/**
 * Alias for pickperson command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./pickperson')(msg, args);
}