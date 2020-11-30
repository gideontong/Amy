/**
 * How gay are you?
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.reply(`you are ${Math.floor(Math.random() * 100)}% gay!`);
}