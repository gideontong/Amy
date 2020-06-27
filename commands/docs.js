// Imports from local config files
const config = require('../config/config.json');

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running website command
module.exports = async (bot, msg, args) => {
    msg.channel.send(config.links.docs);
    log.info(`${msg.author.tag} ${msg.author} requested the documentation`);
}