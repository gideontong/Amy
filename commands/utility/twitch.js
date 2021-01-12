const link = 'https://twitch.tv/dudesof708';

/**
 * Returns the link to our Twitch channel
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send(`Check out our Twitch channel! ${link}`);
}