// Imports from local config files
const config = require('../config/config.json');

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running rules command
module.exports = async (bot, msg, args) => {
    msg.channel.send(config.rules);
    log.info(`${msg.author.tag} ${msg.author} asked for the ruels in ${msg.channel}`);
}