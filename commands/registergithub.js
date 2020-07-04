// Imports from local configs
const config = require('../config/config.json');
const targets = config.targets;

// Imports from local dependencies
const log = require('log4js').getLogger('amy');
const { extractSnowflake } = require('../lib/Validation');
const { setStatistic } = require('../lib/Achievement');

// Handler for running GitHub commands
module.exports = async (bot, msg, args) => {
    if (msg.author.id == targets.gideon) {
        if (args.length == 3) {
            let snowflake = extractSnowflake(args[2]);
            if (snowflake) {
                updateUser(snowflake, args[1]);
                msg.reply(`I updated <@${snowflake}>'s username to ${args[1]}`);
            } else {
                msg.reply('update failed! Check for a valid snowflake?');
                log.info(`Failed to update other person as snowflake was ${snowflake}`)
            }
        }
        else{
            updateUser(msg.author.id, args[1]);
            msg.reply(`successfully updated your GitHub username to ${args[1]}`);
        }
    } else {
        if (args.length == 2) {
            if (args[1] == "gideontong") msg.reply("That's definitely not your GitHub account...");
            else {
                updateUser(msg.author.id, args[1]);
                msg.reply(`successfully updated your GitHub username to ${args[1]}`)
            }
        } else {
            msg.reply('to register your GitHub account with **Amy**, use the command `!registergithub [username]`');
        }
    }
}

function updateUser(snowflake, username) {
    setStatistic(snowflake, 'github', username);
    log.info(`Updated Discord user ${snowflake} to GitHub user ${username}`);
}