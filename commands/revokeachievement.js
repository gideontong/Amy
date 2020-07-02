// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { removeAchievement } = require('../lib/Achievement');
const log = require('log4js').getLogger('amy');

// Wrapper for Achievement.removeAchievement()
module.exports = async (bot, msg, args) => {
    if (args[0].startsWith('!')) {
        if (msg.author != targets.gideon) return;
        else args[0] = args[1];
    }
    const success = removeAchievement(msg.author.id, args[0]);
    if (success) {
        timeout = { "timeout": 3000 };
        msg.channel.send(`Deleted ${args[0]} from your achievements.`)
            .then(msg => msg.delete(timeout));
        log.info(`${msg.author.tag} ${msg.author} deleted self achievement ${args[0]}`);
    }
}