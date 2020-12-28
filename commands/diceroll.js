/**
 * Do a dice roll!
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send(`🎲 Your dice roll landed on ${Math.floor(Math.random() * 6 + 1)}! 🎲`);
}