// Imports from local config files
const config = require('../config/config.json');

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running insaneaslyum command
module.exports = async (bot, msg, args) => {
    if(Math.random() < config.constants.trollProbability) {
        msg.channel.send(config.links.troll);
    } else {
        msg.channel.send(config.links.asylum);
    }
    log.info(`${msg.author.tag} ${msg.author} rquested the insane aslyum playlist`)
}