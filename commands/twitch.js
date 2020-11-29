const link = 'https://twitch.tv/dudesof708';

/**
 * Returns the link to our Twitch channel
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(`Check out our Twitch channel! ${link}`);
}