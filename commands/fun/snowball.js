/**
 * Pelt a snowball at someone
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (msg.mentions.users.size > 0) {
        msg.channel.send(`❄ <@${msg.author.id}> pelted <@${msg.mentions.users.firstKey()}> with a snowball!`);
    } else {
        msg.channel.send(`⛄ <@${msg.author.id}> built a snowman!`);
    }
}