// Imports from local config files
const { prefix,
    probabilities,
    channels,
    emotes } = require('../../config/config.json');
const { sarcasm } = require('../../config/responses.json');
const permissions = require('../../config/permissions.json');

// Imports from dependencies
const { isIgnored } = require('../../lib/Validation');
const log = require('log4js').getLogger('kevin');

/**
 * Handles messages for newly sent messages, parsing for commands and actions
 * @param {Message} message Message that was newly sent
 */
module.exports = async message => {
    if (isIgnored(message, prefix)) return;
    if (message.content[0] == prefix.kevin) {
        commands = message.content.split(' ');
        toRun = commands[0].slice(1).toLowerCase();
        if (!RegExp(/^[a-z0-9]+$/i).test(toRun)) return;
        try {
            if (!permissions.users.admin.includes(message.author.id)) {
                if (permissions.commands.unreleased.includes(toRun)) {
                    message.reply('Command coming soon!');
                    log.info(`${message.author.tag} ${message.author} tried to run upcoming command ${message.content}`);
                    return;
                } else if (permissions.commands.admin.includes(toRun)) {
                    message.reply("You don't have permission to do that!");
                    log.info(`${message.author.tag} ${message.author} tried to run admin command ${message.content}`);
                    return;
                }
            }
            cmdFile = require(`../commands/${toRun}.js`);
        } catch {
            log.warn(`${message.author.tag} ${message.author} tried to run invalid command ${message.content}`);
            return;
        }
        if (!cmdFile) {
            log.warn(`${message.author.tag} ${message.author} tried to run nonexistent command ${message.content}`);
        } else {
            cmdFile(message.client, message, commands).catch(err => {
                log.error(`${message.author.tag} ${message.author} ran ${message.content} that resulted in error ${err}`);
            })
        }
        return;
    }
    try {
        if (Math.random() < probabilities.kevinReply && !channels.disabled.includes(message.channel.id)) {
            if (Math.random() < 0.5) {
                let pick = Math.floor(Math.random() * sarcasm.length);
                message.reply(sarcasm[pick]);
            } else {
                message.react(`<:yikes:${emotes.yikes}>`)
                    .catch(log.error);
            }
            log.info(`${message.author.tag} ${message.author} triggered a sarcastic response`);
        }
    } catch (err) {
        log.error(`Something... happened? Error was: ${err}`);
    }
}