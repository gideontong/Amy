// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { Message } = require('discord.js');
const log = require('log4js').getLogger('amy');

// Handler for a member update
module.exports = async (oldMember, newMember) => {
    if(newMember.nickname.toLowerCase().includes('amy')) {
        const fakeMessage = new Message();
        fakeMessage.author = newMember;
        fakeMessage.channel = newMember.guild.channels.resolve(targets.general);
        log.info(`A new member changed to include Amy, checking with ${fakeMessage}`);
        require('../commands/grantachievement')(newMember.client, fakeMessage, ['becomeAmy']);
    }
}