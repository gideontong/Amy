// Imports from local config files
const links = require('../config/config.json').links;

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running YouTube command
module.exports = async (bot, msg, args) => {
    msg.channel.send(links.youtube);
    log.info(`${msg.author.tag} ${msg.author} requested the YouTube channel`);
}