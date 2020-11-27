const log = require('log4js').getLogger('amy');

/**
 * Creates an alert when a new user joins a server
 * @param {GuildMember} member New user that joined a server
 */
module.exports = async member => {
    if (member.user.bot) return;
    log.info(`${member.user.tag} ${member} joined the server`);
}