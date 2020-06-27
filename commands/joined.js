// Imports from dependencies
const { toLocaleString, convertSnowflake } = require('../lib/Today');
const log = require('log4js').getLogger('amy')

// new Date(ID ? (ID / 4194304) + 1420070400000 : 0).toLocaleString()
// Handler for running joined command
module.exports = async (bot, msg, args) => {
    var id = msg.author.id;
    var requester = "you";
    if (args.length > 1) {
        id = (!isNaN(args[1])) ? parseInt(args[1]) : parseInt(msg.mentions.members.firstKey());
        requester = "they";
    }
    const joined = toLocaleString(convertSnowflake(id));
    msg.reply(`${requester} joined Discord at ${joined}`);
    // msg.reply(`you joined at ${joined}. Use \`!howold\` to see how old your Discord account is!`);
    log.info(`${msg.author.tag} ${msg.author} requested a Discord account creation time`);
}