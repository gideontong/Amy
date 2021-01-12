/**
 * Alias for diceroll command
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    require('./diceroll')(msg, args);
}