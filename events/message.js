const interdasting = 'https://i.imgur.com/9h7eFti.png';

const { prefix } = require('../config/config.json');
const permissions = require('../config/permissions.json');
const responses = require('../config/responses.json');
const { isIgnored } = require('../lib/Validation');
const log = require('log4js').getLogger('amy');

/**
 * Handles messages for newly sent messages, parsing for commands and actions
 * @param {Message} message Message that was newly sent
 */
module.exports = async message => {
    if (isIgnored(message, prefix.amy)) return;
    if (message.content[0] == prefix.amy) {
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
        let sanitizedMessage = message.cleanContent.toLowerCase();
        log.info(sanitizedMessage);
        if (sanitizedMessage.includes(' of leo')) {
            response = responses.requester[Math.floor(Math.random() * responses.requester.length)]
                + ": " + responses.photos[Math.floor(Math.random() * responses.photos.length)];
            message.reply(response);
            log.info(`${message.author.tag} ${message.author} requested a picture of Leo`);
        } else if (sanitizedMessage.includes('interdasting')) {
            message.channel.send(interdasting);
        }
    } catch (err) {
        log.error(`Something... happened? Error: ${err}`);
    }
}