// Imports from local config files
const responses = require('../../config/responses.json');
const config = require('../../config/config.json');
const targets = config.targets;
const sarcasm = responses.sarcasticKevin;

// Imports from dependencies
const log = require('log4js').getLogger('kevin');
const { isIgnored } = require('../../lib/Validation');
const { getStatistic, setStatistic } = require('../../lib/Achievement');

// Handler for a sent message
module.exports = async message => {
    if (isIgnored(message, config.targets.ignores, "?")) return;
    if (message.author == targets.kevin || message.author == targets.gideon) {
        if (message.content[0] == "?") {
            commands = message.content.split(" ");
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
        }
        log.info(`${message.author.tag} ${message.author} triggered a sarcastic response`);
    }
}