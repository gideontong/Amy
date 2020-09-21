// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { grantAchievement } = require('../lib/Achievement');
const { extractSnowflake } = require('../lib/Validation');
const { MessageAttachment } = require('discord.js');
const log = require('log4js').getLogger('amy');

// Wrapper for Achievement.grantAchievement()
module.exports = async (bot, msg, args) => {
    var snowflake = msg.author.id;
    if (args[0].startsWith(config.prefix)) {
        args[0] = args[1];
        if (args[2]) {
            let sfArg = extractSnowflake(args[2]);
            if (sfArg) snowflake = sfArg;
        }
    }
    const buffer = await grantAchievement(snowflake, args[0]);
    if (buffer) {
        log.info(`${msg.author.tag} ${args[2] ? 'granted ' : ''}<@${snowflake}> ${args[2] ? '' : 'achieved '}achievement ${args[0]}`);
        const image = new MessageAttachment(buffer);
        msg.channel.send(`<@${snowflake}> aren't you feeling cool today!`, image);
    }
}