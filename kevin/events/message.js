// Imports from local config files
const responses = require('../../config/responses.json');
const config = require('../../config/config.json');
const targets = config.targets;
const sarcasm = responses.sarcasticKevin;

// Imports from dependencies
const log = require('log4js').getLogger('kevin');

// Handler for a sent message
module.exports = async message => {
    if (message.author.bot || message.content[0] == "!") return;
    if (messague.author == targets.kevin || message.author == targets.gideon) {
        if (message.content[0] == "?") {
            commands = message.content.split(" ");
            if (message.content[1] != " ") {
                message.delete();
                try {
                    cmdFile = require(`../commands/${commands[0].slice(1)}.js`);
                } catch {
                    log.warn(`${message.author.tag} ${message.author} tried to run an invalid command`);
                    return;
                }
                if (!cmdFile) {
                    log.warn(`${message.author.tag} ${message.author} ran a command that doesn't exist`);
                    return;
                } else {
                    cmdFile(message.client, message, commands).catch(err => {
                        log.error(`${message.author.tag} ${message.author} ran ${message.content} that resulted in error ${err}`);
                    })
                }
            }
        }
    } else if (Math.random() < config.constants.kevinSarcastic) {
        message.reply(sarcasm[Math.floor(Math.random() * sarcasm.length)]);
        log.info(`${message.author.tag} ${message.author} triggered a sarcastic response`);
    }
}