// Imports from local config files
const responses = require('../config/responses.json');
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for a sent message
module.exports = async message => {
    if (message.author.bot) return;
    if (message.author == targets.gideon && message.content[0] == "!") {
        commands = message.content.split(" ");
        if (message.content[1] == "d") {
            var count;
            if (commands.length > 1 && !isNaN(commands[1])) count = parseInt(commands[1]);
            if (!count > 0) count = 100;
            message.channel.bulkDelete(count).then(() => {
                timeout = { "timeout": 3000 };
                message.channel.send("Wiped recent history.")
                    .then(msg => msg.delete(timeout));
            });
            log.info(`${message.author.tag} ${message.author} deleted ${count} messages in ${message.channel}.`);
        } else {
            replyIndex = message.content.indexOf(';');
            if (replyIndex < 0) return;
            reply = message.content.substring(replyIndex + 1);
            if (isNaN(commands[1]) || isNaN(commands[2])) return;
            const channel = message.client.channels.cache.get(commands[1]);
            message.delete();
            channel.send('<@' + commands[2] + '> ' + reply);
            log.info(`${message.author.tag} ${message.author} triggered a manual bot message!`);
        }
    }
    sanitizedMessage = message.content.toLowerCase();
    if (sanitizedMessage.includes('valorant')) {
        if (Math.random() < 0.3) {
            if (Math.random() < 0.8) {
                message.reply("it's time to play Valorant!");
            } else {
                message.reply("it's not time to play Valorant...");
            }
        }
        log.info(`${message.author.tag} ${message.author} mentioned VALORANT!`)
    } else if (sanitizedMessage.includes('skyfactory')) {
        if (Math.random() < 0.9) {
            message.reply("it's time to play Sky Factory 4!");
        } else {
            message.reply("it's not time to play Sky Factory 4...");
        }
        log.info(`${message.author.tag} ${message.author} mentioned SkyFactory!`);
    } else if (sanitizedMessage.includes(' of leo')) {
        response = responses.requester[Math.floor(Math.random() * responses.requester.length)]
            + ": " + responses.photos[Math.floor(Math.random() * responses.photos.length)];
        message.reply(response);
        log.info(`${message.author.tag} ${message.author} requested a picture of Leo!`);
    } else if (message.author.id == targets.leo) {
        if (Math.random() < 0.2) {
            response = responses.prank[Math.floor(Math.random() * responses.prank.length)];
            message.reply(response);
            log.info(`${message.author.tag} ${message.author} triggered a prank response!`);
        }
    } else if (sanitizedMessage.substr(0, 3) == "amy" || sanitizedMessage.includes(message.client.user.id)) {
        if (Math.random() < 0.05) {
            message.reply("you called me?");
        }
        log.info(`${message.author.tag} ${message.author} mentioned me...`)
    }
}