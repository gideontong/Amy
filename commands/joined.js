const { humanSnowflake } = require('../lib/Today');
const { validSnowflake } = require('../lib/Validation');
const log = require('log4js').getLogger('amy')

/**
 * Check when someone created a Discord account
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (client, msg, args) => {
    var id = msg.author.id;
    if (args.length > 1) {
        if (args.length > 2) {
            msg.reply('run `!joined (ID)` to see when you joined Discord!');
            return;
        }
        id = (!isNaN(args[1])) ? args[1] : args[1].substring(3, args[1].length - 1);
    }
    if (validSnowflake(id)) {
        const joined = humanSnowflake(id);
        msg.channel.send(`<@${id}> joined Discord at ${joined}`);
        log.info(`${msg.author.tag} ${msg.author} requested a Discord account creation time`);
    } else {
        msg.reply('are you sure that\'s a Discord tag?');
    }
}