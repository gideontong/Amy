const { extractSnowflake, validChannel } = require('../../lib/Validation');
const log = require('log4js').getLogger('kevin');

/**
 * Repeats a message from a human
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    try {
        if (args.length > 2 && validChannel(args[1])) {
            const snowflake = extractSnowflake(args[1]);
            if (snowflake) {
                const channel = msg.client.channels.cache.get(snowflake);
                channel.send(msg.content.substring(args[0].length + args[1].length + 2));
                log.info(`${msg.author.tag} ${msg.author} told me to send a message in #${channel.name}`);
                return;
            }
        } else {
            msg.channel.send(msg.content.substring(args[0].length + 1));
            msg.delete();
            log.info(`${msg.author.tag} ${msg.author} told me to send a message`);
        }
    } catch (err) {
        log.error(`Something happened while trying to repeat a message: ${err}`);
    }
}