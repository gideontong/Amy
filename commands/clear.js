// Imports from local config files
const config = require('../config/config.json');
const toClear = config.defaults.clearHistory;

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running clear command
module.exports = async(bot, msg, args) => {
    if (args > 2) return;
    msg.channel.bulkDelete(100);
    log.info(`${msg.author.tag} ${msg.author} deleted some messages in ${msg.channel}`)
}