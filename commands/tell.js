// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;
const strings = config.strings;

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running tell command
module.exports = async (bot, msg, args) => {
    if (msg.author != targets.gideon) {
        msg.reply(strings.notAdmin);
        log.info(`${msg.author.tag} ${msg.author} tried to force me to say something`);
    } else {
        msg.channel.send(msg.content.substring(args[0].length + 1));
        log.info(`${msg.author.tag} ${msg.author} told me to send a message`);
    }
}