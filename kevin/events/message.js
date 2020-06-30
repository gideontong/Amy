// Imports from local config files
const responses = require('../../config/responses.json');
const config = require('../../config/config.json');
const targets = config.targets;
const sarcasm = responses.sarcasticKevin;

// Imports from dependencies
const log = require('log4js').getLogger('kevin');

// Handler for a sent message
module.exports = async message => {
    if (message.author.bot || message.author == targets.kevin || message.content[0] == "!") return;
    if (Math.random() < 0.01) {
        message.reply(sarcasm[Math.floor(Math.random() * sarcasm.length)]);
        log.info(`${message.author.tag} ${message.author} triggered a sarcastic response`);
    }
}