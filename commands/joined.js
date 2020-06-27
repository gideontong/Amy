// Imports from dependencies
const log = require('log4js').getLogger('amy')

// new Date(ID ? (ID / 4194304) + 1420070400000 : 0).toLocaleString()
// Handler for running joined command
module.exports = async (bot, msg, args) => {
    var id = parseInt(args[1]) ? (args.legnth > 1 && !isNaN(args[1])) : msg.author.id;
    log.info(id);
    const joined = new Date(id ? (id / 4194304) + 1420070400000 : 0)
        .toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    msg.reply(`you (or the person you're requesting) joined at ${joined}`);
    // msg.reply(`you joined at ${joined}. Use \`!howold\` to see how old your Discord account is!`);
    log.info(`${msg.author.tag} ${msg.author} requested their Discord account creation time`);
}