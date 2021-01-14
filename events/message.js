const { prefix } = require('../config/config.json');
const permissions = require('../config/permissions.json');
const foldermap = require('../config/foldermap.json');
const { isIgnored } = require('../lib/Validation');
const { countAction, countCommand, checkCooldown } = require('../lib/Member');
const log = require('log4js').getLogger('amy');

/**
 * Handles messages for newly sent messages, parsing for commands and actions
 * @param {Message} message Message that was newly sent
 */
module.exports = async message => {
    if (isIgnored(message, prefix.amy)) return;
    if (message.content[0] == prefix.amy) {
        let arguments = message.content.split(' ');
        let command = arguments[0].slice(1).toLowerCase();
        let commandFile;
        if (!RegExp(/^[a-z0-9]+$/i).test(command)) return;
        if (!permissions.users.admin.includes(message.author.id)) {
            if (permissions.commands.unreleased.includes(command)) {
                message.reply('Command coming soon!');
                return;
            } else if (permissions.commands.admin.includes(command)) {
                message.reply("You don't have permission to do that!");
                return;
            }
        }
        try {
            if (command in foldermap) {
                commandFile = require(`../commands/${foldermap[command]}/${command}.js`);
            } else {
                return;
            }
        } catch (err) {
            log.warn(`${message.author.tag} failed to run ${command}`);
            return;
        }
        if (!commandFile) {
            log.warn(`${message.author.tag} tried to run nonexistent command ${message.content}`);
        } else {
            commandFile(message, arguments).catch(err => {
                log.error(`${message.author.tag} ran ${message.content} that resulted in error ${err}`);
            });
        }
        // Statistics
        try {
            countCommand(message.author.id, command);
        } catch (err) {
            log.error(`Error with database: ${err}`);
        }
        return;
    }
    // Statistics
    try {
        countAction(message.author.id, 'message');
    } catch (err) {
        log.error(`Error with database: ${err}`);
    }
}