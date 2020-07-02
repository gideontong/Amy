// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { generateAchievementProgress } = require('../lib/Achievement');
const log = require('log4js').getLogger('amy');

// Handler for running achievements command
module.exports = async (bot, msg, args) => {
    if (msg.author != targets.gideon) return;
    let string = await generateAchievementProgress(msg.author.id);
    msg.reply(string);
    log.info(`${msg.author.tag} ${msg.author} requested their achievements progress`);
}