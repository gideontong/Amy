const link = 'https://amyhelps.ml';

/**
 * Returns the website URL
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(`Our website is still in development, but here it is: ${link}`);
}