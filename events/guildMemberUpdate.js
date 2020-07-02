// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { Message, MessageAttachment } = require('discord.js');
const { grantAchievement } = require('../lib/Achievement');
const log = require('log4js').getLogger('amy');

// Handler for a member update
module.exports = async (oldMember, newMember) => {
    if(newMember.nickname.toLowerCase().includes('amy')) {
        log.info(`${newMember.tag} ${newMember} changed their nickname to include Amy`);
        let channel = newMember.client.channels.cache.get(targets.bots);
        const buffer = await grantAchievement(newMember.id, 'becomeAmy');
        if (buffer) {
            const image = new MessageAttachment(buffer);
            channel.send(`<@${newMember.id}> I shouldn't even be surprised you did this...`, image);
        }
    }
}