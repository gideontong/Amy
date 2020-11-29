/**
 * Do a dice roll!
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(`🎲 Your dice roll landed on ${Math.floor(Math.random() * 6 + 1)}! 🎲`);
}