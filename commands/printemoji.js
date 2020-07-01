// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running printemoji command
module.exports = async (bot, msg, args) => {
    if (msg.author != targets.gideon && msg.author != targets.amy) return;
    // TODO: add support for emoji names
    const emoji = bot.emojis.resolve(args[1]);
    if (emoji) {
        msg.channel.send(emoji.toString());
        log.info(`${msg.author.tag} ${msg.author} told me to repeat :${emoji.name}: ${emoji.animated? '(animated)': ''}`);
    }
}