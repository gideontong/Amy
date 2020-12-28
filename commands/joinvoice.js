/**
 * Join a call
 * @param {Message} msg Message
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (msg.member.voice.channel) {
        await msg.member.voice.channel.join();
    }
}