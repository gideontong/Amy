const log = require('log4js').getLogger('amy');

/**
 * Prints an emoji, regardless of whether it was animated or not
 * @param {Client} client Discord client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    // TODO: add support for emoji names
    var emoji = client.emojis.resolve(args[1]);
    if (emoji) {
        msg.channel.send(emoji.toString());
        log.info(`${msg.author.tag} ${msg.author} told me to repeat :${emoji.name}: ${emoji.animated? '(animated)': ''}`);
    }
}