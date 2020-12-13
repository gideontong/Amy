const log = require('log4js').getLogger('amy');

/**
 * Reacts to the last message with an emote of choice (if possible)
 * @param {Client} client Discord server client
 * @param {Message} message Command
 * @param {Array} args Arguments
 */
module.exports = async (client, message, args) => {
    var emoji;
    if (args.length < 2) {
        message.channel.send('You need to provide an emote!');
        return;
    }
    if (isNaN(args[1])) {
        let search = args[1].toLowerCase();
        let emojis = client.emojis.cache.array();
        for (potential of emojis) {
            if (search == potential.name.toLowerCase()) {
                emoji = potential;
            }
        }
    } else {
        emoji = client.emojis.resolve(args[1]);
    }
    if (emoji) {
        message.delete();
        let messages = message.channel.messages.cache;
        message.channel.send(messages.keyArray());
    } else {
        message.channel.send("I couldn't find that emote...");
        log.warn(`User tried to react with ${args[1]}`)
    }
}