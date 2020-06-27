// Imports from dependencies
const { timeSinceSnowflake } = require('../lib/Today');
const log = require('log4js').getLogger('amy')

// See joined command for more info
// Handler for running accountage command
module.exports = async (bot, msg, args) => {
    var id = msg.author.id;
    if (args.length > 1) {
        id = (!isNaN(args[1])) ? parseInt(args[1]) : parseInt(msg.mentions.members.firstKey());
        requester = "they";
    }
    const timeSince = timeSinceSnowflake(id);
    log.info(`${msg.author.tag} ${timeSince}`);
}