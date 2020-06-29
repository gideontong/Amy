// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running clear command
module.exports = async (bot, msg, args) => {
    if (!msg.author.id == targets.gideon) return;
    msg.channel.send(config.welcome);
    msg.channel.send('Oh, and one more thing. Here\'s the permanent invite link to this server: https://discord.gg/WUGMTcZ');
    log.info(`${msg.author.tag} ${msg.author} triggered the welcome message in ${msg.channel}`);
}