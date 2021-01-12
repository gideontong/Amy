const { timeSinceSnowflake } = require('../lib/Today');
const { validSnowflake } = require('../lib/Validation');
const log = require('log4js').getLogger('amy')

/**
 * Returns the account age of an account
 * @param {Message} msg Message emitted
 * @param {Array} args Arguments to parse
 */
module.exports = async (msg, args) => {
    var id = msg.author.id;
    if (args.length > 1) {
        id = (!isNaN(args[1])) ? args[1] : args[1].substring(3, args[1].length - 1);
    }
    if (validSnowflake(id)) {
        const timeSince = timeSinceSnowflake(id);
        msg.channel.send(`<@${id}>'s account is about ${timeSince} old!`);
        log.info(`${msg.author.tag} ${msg.author} requested the account age of ${id}`); 
    } else {
        msg.reply('are you sure that\'s a Discord tag?');
    }
}