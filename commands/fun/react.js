const log = require('log4js').getLogger('amy');

/**
 * Reacts to the last message with an emote of choice (if possible)
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    var emoji;
    if (args.length < 2) {
        msg.channel.send('You need to provide an emote!');
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
        msg.delete()
            .catch(err => log.warn(`Tried to delete a message but got ${err}`));
        let messages = msg.channel.messages.cache;
        if (messages.size > 1) {
            const target = messages.keyArray()[messages.size - 2];
            try {
                const targetMessage = messages.get(target);
                if (targetMessage) {
                    targetMessage.react(emoji.toString());
                }
            } catch (err) {
                log.error(`While trying to react I got ${err}`);
            }
        } else {
            msg.channel.send("I couldn't find any messages in this channel to react to. Either I'm still loading or there actually isn't any messages here.");
        }
    } else {
        msg.channel.send("I couldn't find that emote...");
        log.warn(`User tried to react with ${args[1]}`)
    }
}