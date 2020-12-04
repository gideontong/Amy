/**
 * Join a call
 * @param {Client} client Discord server client
 * @param {Message} msg Message
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (Message.member.voice.channel) {
        await msg.member.voice.channel.join();
    }
}