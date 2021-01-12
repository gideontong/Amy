/**
 * Alias for stockprice command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./stockprice')(msg, args);
}