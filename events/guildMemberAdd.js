// Import from local config files
const config = require('../config/config.json');
const strings = config.strings;

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for a new member added
module.exports = async member => {
    if (member.user.bot) return;
    member.send(strings.newMember);
    log.info(`${member.user.tag} ${member} joined the server`);
}