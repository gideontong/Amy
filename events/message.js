// Imports from local config files
const responses = require('../config/responses.json');
const config = require('../config/config.json');
const { isIgnored } = require('../lib/Validation');
const targets = config.targets;
const strings = config.strings;

// Imports from dependencies
// const { geometric } = require('../lib/Poisson');
const log = require('log4js').getLogger('amy');

// Handler for a sent message
module.exports = async message => {
    if (isIgnored(message, targets.ignores, "!")) return;
    // Will be deleted on next major update
    if ((message.author == targets.gideon && message.content[0] == "!") || (message.author == targets.amy && message.content.startsWith("!tell"))) {
        commands = message.content.split(" ");
        message.delete();
        try {
            cmdFile = require(`../commands/${commands[0].slice(1)}.js`);
        } catch {
            log.warn(`${message.author.tag} ${message.author} tried to run an invalid command`);
            return;
        }
        if (!cmdFile) {
            log.warn(`${message.author.tag} ${messague.author} ran a command that doesn't exist`);
            return;
        } else {
            cmdFile(message.client, message, commands).catch(err => {
                log.error(`${message.author.tag} ${message.author} ran ${message.content} that resulted in error ${err}`);
            })
        }
    }
    sanitizedMessage = message.content.toLowerCase();
    if (sanitizedMessage.includes('valorant') && sanitizedMessage.includes(' ')) {
        if (Math.random() < 0.3) {
            if (Math.random() < 0.8) {
                message.reply(strings.isValorantTime);
            } else {
                message.reply(strings.notValorantTime);
            }
        }
        log.info(`${message.author.tag} ${message.author} mentioned VALORANT`)
    } else if (sanitizedMessage.includes('skyfactory')) {
        if (Math.random() < 0.9) {
            message.reply(strings.isSkyFactoryTime);
        } else {
            message.reply(strings.notSkyFactoryTime);
        }
        log.info(`${message.author.tag} ${message.author} mentioned SkyFactory`);
    } else if (sanitizedMessage.includes(' of leo')) {
        // Replace with Poisson class in the future
        response = responses.requester[Math.floor(Math.random() * responses.requester.length)]
            + ": " + responses.photos[Math.floor(Math.random() * responses.photos.length)];
        message.reply(response);
        log.info(`${message.author.tag} ${message.author} requested a picture of Leo`);
    } else if (message.author.id == targets.leo) {
        if (Math.random() < 0.1) {
            response = responses.prank[Math.floor(Math.random() * responses.prank.length)];
            message.reply(response);
            log.info(`${message.author.tag} ${message.author} triggered a prank response`);
        }
    } else if (sanitizedMessage.substr(0, 3) == "amy" || sanitizedMessage.includes(message.client.user.id)) {
        if (Math.random() < 0.05) {
            message.reply("you called me?");
        }
        log.info(`${message.author.tag} ${message.author} mentioned me`)
    }
}