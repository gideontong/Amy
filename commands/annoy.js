// Imports from local config files
const config = require('../config/config.json');

// Imports from dependencies
const log = require('log4js').getLogger('amy');
const { extractSnowflake } = require('../lib/Validation');

// Handler for running annoy command
module.exports = async (bot, msg, args) => {
    var id = msg.author.id;
    if (args.length < 2) {
        msg.reply('imagine not trying to annoy someone else? HAHAHA');
    } else if (args.length > 2) {
        msg.reply('run `!annoy (user)` to annoy them!');
    } else {
        const annoy = extractSnowflake(args[1]);
        if (annoy) {
            const link = Math.random() < 0.3 ? config.links.troll : "https://www.youtube.com/watch?v=VGBO663oenw";
            msg.channel.send(`Hey, <@${annoy}>! I was told to be annoying to you, so watch this video: ${link}`);
            require('./grantachievement')(bot, msg, ['annoying']);
            log.info(`${msg.author.tag} ${msg.author} decided to annoy <@${annoy}>`);
        } else {
            msg.reply('that is not a person...?');
        }
    }
}