// Imports from local config files
const { prefix, probabilities } = require('../../config/config.json');
const { sarcasm } = require('../../config/responses.json');
const permissions = require('../config/permissions.json');

// Imports from dependencies
const { isIgnored } = require('../../lib/Validation');
const log = require('log4js').getLogger('kevin');

/**
 * Handles messages for newly sent messages, parsing for commands and actions
 * @param {Message} message Message that was newly sent
 */
module.exports = async message => {
    if (isIgnored(message, prefix)) return;
    if (message.author == targets.kevin || message.author == targets.gideon) {
        if (message.content[0] == "?") {
            commands = message.content.split(" ");
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
    } else if (Math.random() < config.constants.kevinSarcastic && !config.targets.disabledChannels.includes(message.channel.id)) {
        if (Math.random() < 0.5) {
            let pick = Math.floor(Math.random() * sarcasm.length);
            message.reply(sarcasm[pick]);
            let replies = await getStatistic(message.author.id, 'discover_comment');
            if (!replies) replies = [];
            replies[pick] = true;
            if(replies.reduce((total, forward) => {
                return total + forward;
            }) == sarcasm.length) {
                require('../../commands/grantachievement')(message.client, message, ['allKevinResponses']);
            }
            await setStatistic(message.author.id, 'discover_comment', replies);
        } else {
            message.react(message.guild.emojis.cache.get(config.emoji.pepeYikes))
                .catch(log.error);
            await setStatistic(message.author.id, 'discover_pepeyikes', true);
        }
        log.info(`${message.author.tag} ${message.author} triggered a sarcastic response`);
    }
}