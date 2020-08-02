// Imports from local config files
const responses = require('../config/responses.json');
const config = require('../config/config.json');
const permissions = require('../config/permissions.json');
const targets = config.targets;
const strings = config.strings;

// Imports from dependencies
// const { geometric } = require('../lib/Poisson');
const { isIgnored } = require('../lib/Validation');
const { updateStatistic, getStatistic, setStatistic } = require('../lib/Achievement');
const log = require('log4js').getLogger('amy');

// Handler for a sent message
module.exports = async message => {
    if (isIgnored(message, targets.ignores, "!")) return;
    if (message.content[0] == "!") {
        commands = message.content.split(" ");
        toRun = commands[0].slice(1).toLowerCase();
        try {
            if (message.author != targets.gideon) {
                if (permissions.soon.includes(toRun)) {
                    message.reply('Command coming soon!');
                    log.info(`${message.author.tag} ${message.author} tried to run upcoming command ${message.content}`);
                    return;
                } else if (permissions.admin.includes(toRun)) {
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
            let uses = await updateStatistic(message.author.id, `use_${toRun}`, 1)
            if (uses == 1) {
                let cmdUses = await updateStatistic(message.author.id, 'commands', 1);
                if (cmdUses >= config.constants.uniqueCommands) require('../commands/grantachievement')(message.client, message, ['useCommandsAll']);
            }
        }
        return;
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
    } else if (sanitizedMessage.includes('leo is gay')) {
        require('../commands/grantachievement')(message.client, message, ['leoGay']);
    } else if (sanitizedMessage.startsWith('eh')) {
        const regex = RegExp('([a-df-gi-z0-9])', 'g');
        if (!regex.test(sanitizedMessage)) {
            let values = await getStatistic(message.author.id, 'say_eh');
            values[sanitizedMessage.length - 1]++;
            await setStatistic(message.author.id, values);
        }
    }
}