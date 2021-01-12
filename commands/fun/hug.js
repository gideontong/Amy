/**
 * Hug someone
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (msg.mentions.users.size > 0) {
        msg.channel.send(`🫂 <@${msg.author.id}> gave <@${msg.mentions.users.firstKey()}> a hug.`);
    } else {
        msg.channel.send('🫂');
    }
}