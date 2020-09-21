// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { removeAchievement } = require('../lib/Achievement');
const { extractSnowflake } = require('../lib/Validation');
const log = require('log4js').getLogger('amy');

// Wrapper for Achievement.removeAchievement()
module.exports = async (bot, msg, args) => {
    var snowflake = msg.author.id;
    if (args[0].startsWith(config.prefix)) {
        args[0] = args[1];
        if (args[2]) {
            let sfArg = extractSnowflake(args[2]);
            if (sfArg) snowflake = sfArg;
        }
    }
    const success = removeAchievement(snowflake, args[0]);
    if (success) {
        timeout = { "timeout": 3000 };
        msg.channel.send(`Deleted ${args[0]} from ${args[2] ? 'their' : 'your'} achievements.`)
            .then(msg => msg.delete(timeout));
        log.info(`${msg.author.tag} ${msg.author} deleted achievement ${args[0]} from <@${snowflake}>`);
    }
}