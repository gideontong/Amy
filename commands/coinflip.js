/**
 * Simulate a coin flip
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(`🪙 You flipped ${Math.random() < 0.5 ? 'heads': 'tails'}! 🪙`);
}