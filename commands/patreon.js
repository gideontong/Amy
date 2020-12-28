const link = 'https://www.patreon.com/dudesof708';

/**
 * Returns the link to our Patreon page
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send(`Support us on Patreon! ${link}`);
}