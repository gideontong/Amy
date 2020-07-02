// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { grantAchievement } = require('../lib/Achievement');
const { MessageAttachment } = require('discord.js');
const log = require('log4js').getLogger('amy');

// Wrapper for Achievement.grantAchievement()
module.exports = async (bot, msg, args) => {
    if (args[0].startsWith('!')) {
        if (msg.author != targets.gideon) return;
        else args[0] = args[1];
    }
    const buffer = await grantAchievement(msg.author.id, args[0]);
    if (buffer) {
        log.info(`${msg.author.tag} ${msg.author} achieved achievement ${args[0]}`);
        const image = new MessageAttachment(buffer);
        msg.reply(`aren't you feeling cool today!`, image);
    }
}