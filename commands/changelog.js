// Config
const { links } = require('../config/config.json');

// Dependencies
const log = require('log4js').getLogger('amy');

// changelog handler
module.exports = async (bot, msg, args) => {
    msg.channel.send(`You can find the latest changes here: ${links.changelog}`);
    log.info(`${msg.author.tag} ${msg.author} requested the changelog`);
}