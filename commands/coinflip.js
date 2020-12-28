/**
 * Simulate a coin flip
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send(`🪙 You flipped ${Math.random() < 0.5 ? 'heads': 'tails'}! 🪙`);
}