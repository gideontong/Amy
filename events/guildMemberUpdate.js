// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for a member update
module.exports = async (oldMember, newMember) => {
    log.info(`Change detected, ${oldMember} ${newMember}`);
    if(newMember.nickname.toLowerCase().includes('amy')) {
        require('../commands/grantachievement')(newMember.client, newMember.lastMessage, ['becomeAmy']);
    }
}