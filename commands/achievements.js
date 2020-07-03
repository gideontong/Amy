// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { generateAchievementProgress } = require('../lib/Achievement');
const { extractSnowflake } = require('../lib/Validation');
const log = require('log4js').getLogger('amy');

// Handler for running achievements command
module.exports = async (bot, msg, args) => {
    if (msg.author != targets.gideon) return;
    let snowflake = msg.author.id;
    if (args[1]) {
        let sfArg = extractSnowflake(args[1]);
        if (sfArg) snowflake = sfArg;
    }
    let [emojiString, unlocked, secret] = await generateAchievementProgress(snowflake);
    let displayName = msg.guild.members.resolve(snowflake).displayName;
    let message = {
        content: `Your achievements are looking pretty strong...`,
        embed:
        {
            "title": `${displayName}'s Achievements`,
            "description": `You've unlocked ${unlocked} achievements and ${secret} secret achievements! Want to find out more about an achievement? Use \`!achievement [ID]\` to learn more!\n*IDs can be found by hovering your mouse over the icon.*\n\n${emojiString}`,
            "color": 2155732,
            "footer": {
                "text": "Amy Nguyen's Achievements System",
                "icon_url": "https://cdn.discordapp.com/avatars/721503241531162707/e04f2a03baf23be92a9c937e79e973d0.png"
            }
        }
    }
    msg.channel.send(message);
    log.info(`${msg.author.tag} ${msg.author} requested achievements progress of ${displayName} <@${snowflake}>`);
}