// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running clear command
module.exports = async (bot, msg, args) => {
    if (!msg.author.id == targets.gideon) return;
    config.welcome.forEach(wText => function() { msg.channel.send(wText) });
    log.info(`${msg.author.tag} ${msg.author} triggered the welcome message in ${msg.channel}`);
}