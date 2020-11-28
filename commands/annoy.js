const { extractSnowflake } = require('../lib/Validation');

/**
 * Pings a desired person with an annoying message
 * @param {Client} client Discord server client
 * @param {Message} msg Message to execute
 * @param {Array} args Command arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 2) {
        msg.reply('imagine not trying to annoy someone else? HAHAHA');
    } else {
        const annoy = extractSnowflake(args[1]);
        if (annoy) {
            msg.channel.send(`Hey, <@${annoy}>! Your breath smells!`);
        } else {
            msg.reply('that is not a person...?');
        }
    }
}