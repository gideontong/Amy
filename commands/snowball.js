/**
 * Pelt a snowball at someone
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (msg.mentions.users.size > 0) {
        msg.channel.send(`❄ <@${msg.author.id}> pelted <@${msg.mentions.users.firstKey()}> with a snowball!`);
    } else {
        msg.channel.send(`⛄ <@${msg.author.id}> built a snowman!`);
    }
}