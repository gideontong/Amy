// Imports from dependencies
const { timeSinceSnowflake } = require('../lib/Today');
const log = require('log4js').getLogger('amy')

// See joined command for more info
// Handler for running accountage command
module.exports = async (bot, msg, args) => {
    var id = msg.author.id;
    if (args.length > 1) {
        if (args.length > 2) {
            msg.reply('run `!accountage (ID)` to get your account age!');
            return;
        }
        id = (!isNaN(args[1])) ? args[1] : args[1].substring(3, args[1].length - 1);
    }
    const timeSince = timeSinceSnowflake(id);
    msg.channel.send(`<@${id}>'s account is about ${timeSince} old!`);
    log.info(`${msg.author.tag} ${msg.author} requested the account age of ${id}`); 
}