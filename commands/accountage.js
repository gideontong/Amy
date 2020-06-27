// Imports from dependencies
const log = require('log4js').getLogger('amy')

// See joined command for more info
// Handler for running accountage command
module.exports = async (bot, msg, args) => {
    var id = msg.author.id;
    if (args.length > 1) {
        id = (!isNaN(args[1])) ? parseInt(args[1]) : parseInt(msg.mentions.members.firstKey());
        requester = "they";
    }
    const joined = new Date(id ? (id / 4194304) + 1420070400000 : 0)
        .toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
}