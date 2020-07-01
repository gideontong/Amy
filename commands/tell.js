// Imports from local config files
const config = require('../config/config.json');
const { validChannel, extractSnowflake } = require('../lib/Validation');
const targets = config.targets;
const strings = config.strings;

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running tell command
module.exports = async (bot, msg, args) => {
    if (msg.author != targets.gideon && msg.author != targets.amy) {
        msg.reply(strings.notAdmin);
        log.info(`${msg.author.tag} ${msg.author} tried to force me to say something`);
    } else if (args.length > 2 && validChannel(args[1])) {
        const snowflake = extractSnowflake(args[1]);
        // More input validation may be needed
        if (snowflake) {
            const channel = msg.client.channels.cache.get(snowflake);
            channel.send(msg.content.substring(args[0].length + args[1].length + 2));
            log.info(`${msg.author.tag} ${msg.author} told me to send a message in <#${snowflake}>`);
            return;
        }
    } else {
        msg.channel.send(msg.content.substring(args[0].length + 1));
        log.info(`${msg.author.tag} ${msg.author} told me to send a message`);
    }
}