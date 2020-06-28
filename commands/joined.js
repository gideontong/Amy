// Imports from dependencies
const { humanSnowflake } = require('../lib/Today');
const log = require('log4js').getLogger('amy')

// new Date(ID ? (ID / 4194304) + 1420070400000 : 0).toLocaleString()
// Handler for running joined command
module.exports = async (bot, msg, args) => {
    var id = msg.author.id;
    if (args.length > 1) {
        id = (!isNaN(args[1])) ? parseInt(args[1]) : parseInt(msg.mentions.members.firstKey());
    }
    const joined = humanSnowflake(id);
    msg.channel.send(`<@${id}> joined Discord at ${joined}`);
    log.info(`${msg.author.tag} ${msg.author} requested a Discord account creation time`);
}