const { welcome } = require('../config/messages.json');
const log = require('log4js').getLogger('amy');

/**
 * Responds with the server about messages
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    welcome[708].forEach(wText => msg.channel.send(wText));
    log.info(`${msg.author.tag} ${msg.author} triggered the welcome message in ${msg.channel}`);
}