const link = 'https://tenor.com/view/xqc-xqcsuck-sucking-suck-mr-cow-gif-18444037';

/**
 * Suck command returns xQc GIF
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (msg.channel.type == 'text' && msg.channel.nsfw) {
        msg.channel.send(link);
    } else {
        msg.channel.send("You want to what? This isn't a NSFW channel.");
    }
}