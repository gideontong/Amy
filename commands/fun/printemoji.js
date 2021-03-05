const log = require('log4js').getLogger('amy');

/**
 * Prints an emoji, regardless of whether it was animated or not
 * @param {Client} client Discord client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    var emoji;
    if (args.length < 2) {
        message.channel.send('You need to provide an emote!');
        return;
    }
    if (isNaN(args[1])) {
        let search = args[1].toLowerCase();
        let emojis = msg.client.emojis.cache.array();
        for (potential of emojis) {
            if (search == potential.name.toLowerCase()) {
                emoji = potential;
            }
        }
    } else {
        emoji = msg.client.emojis.resolve(args[1]);
    }
    if (emoji) {
        msg.channel.send(emoji.toString());
        log.info(`${msg.author.tag} ${msg.author} told me to repeat :${emoji.name}: ${emoji.animated? '(animated)': ''}`);
    }
}