// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running printemoji command
module.exports = async (bot, msg, args) => {
    if (msg.author != targets.gideon && msg.author != targets.amy) return;
    // msg.channel.send(`<:${args[1]}:${args[2]}>`);
    msg.channel.send(bot.emoji.find(emoji => emoji.name.toLowerCase() == args[1]));
    log.info(`${msg.author.tag} ${msg.author} told me to repeat ${args[1]}`);
}