const link = 'https://www.patreon.com/dudesof708';

/**
 * Returns the link to our Patreon page
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(`Support us on Patreon! ${link}`);
}