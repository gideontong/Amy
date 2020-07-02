// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { MessageAttachment } = require('discord.js');
const { generateAchievementBanner } = require('../lib/Achievement');
const log = require('log4js').getLogger('amy');

// Handler for running generateachievement command
module.exports = async (bot, msg, args) => {
    if (msg.author != targets.gideon) return;
    let secret = args[1] == "secret";
    let string = args[1] == "secret" ? msg.content.substring(args[0].length + args[1].length + 2) : msg.content.substring(args[0].length + 1);
    const buffer = generateAchievementBanner('test', string, secret, true);
    const image = new MessageAttachment(buffer);
    msg.channel.send(`Here's your test achievement:`, image);
    log.info(`${msg.author.tag} ${msg.author} generated an achievement`);
}