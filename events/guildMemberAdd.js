// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for a new member added
module.exports = async member => {
    if (member.user.bot) return;
    log.info(`${member.user.tag} ${member} joined the server`);
}