const link = 'https://www.patreon.com/gideontong';

/**
 * Returns the link to our Patreon page
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send(`Support us on Patreon! ${link}`);
}