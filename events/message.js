const { prefix, emotes, probabilities, guilds } = require('../config/config.json');
const { emotes: funmotes } = require('../config/fun.json');
const permissions = require('../config/permissions.json');
const foldermap = require('../config/foldermap.json');
const commands = require('../config/commands.json');
const { isIgnored } = require('../lib/Validation');
const {
    getProfile,
    countAction,
    countCommand,
    checkCooldown } = require('../lib/Member');
const log = require('log4js').getLogger('amy');

/**
 * Handles messages for newly sent messages, parsing for commands and actions
 * @param {Message} message Message that was newly sent
 */
module.exports = async message => {
    if (isIgnored(message, prefix.amy)) return;
    if (message.content[0] == prefix.amy) {
        let arguments = message.content.split(/\s+/);
        let command = arguments[0].slice(1).toLowerCase();
        if (!RegExp(/^[a-z0-9]+$/i).test(command)) return;
        if (!permissions.users.admin.includes(message.author.id)) {
            if (permissions.commands.unreleased.includes(command)) {
                return message.channel.send({
                    embed: {
                        description: 'That command is coming soon!',
                        footer: {
                            text: 'Try joining Amy\'s server to use beta commands...'
                        }
                    }
                });
            } else if (permissions.commands.admin.includes(command)) {
                return message.channel.send({
                    embed: {
                        description: `<@${message.author.id}>, you don't have permission to do that!`,
                        footer: {
                            text: 'You need to be the creator of Amy...'
                        }
                    }
                });
            }
        }
        if (command in commands) {
            let cooldown = new Date();
            getProfile(message.author.id, function (profile) {
                const now = new Date();
                const premium = now < profile.premium.expiry;
                if (!premium) {
                    if (commands[command].flags.premium) {
                        message.channel.send(`You need to be premium to use this command! Try: \`${prefix.amy}premium\` for more information.`);
                        return;
                    }
                    else if (Math.random() < probabilities.premiumAd) {
                        message.channel.send('Reduce your message cooldown with a premium subscription!');
                    }
                }
                cooldown.setSeconds(
                    cooldown.getSeconds() +
                    commands[command].cooldown[premium ? 'premium' : 'standard']);
                checkCooldown(message.author.id, command, function (data) {
                    if (data) {
                        message.react(emotes.stop).catch(err => { });
                    } else {
                        execute(message, command);
                    }
                }, cooldown);
            });
        } else {
            execute(message, command);
        }
        return;
    } else if (guilds.enabled.includes(message.guild.id)) {
        if (Math.random() < probabilities.reactChance) {
            message.react(funmotes[Math.floor(Math.random() * funmotes.length)]);
        }
    }
    // Statistics
    try {
        countAction(message.author.id, 'message');
    } catch (err) {
        log.error(`Error with database: ${err}`);
    }
}

/**
 * Execute a command
 * @param {Message} message Message
 * @param {String} command Command
 */
function execute(message, command) {
    const arguments = message.content.split(' ');
    let commandFile;
    if (command in foldermap) {
        try {
            commandFile = require(`../commands/${foldermap[command]}/${command}.js`);
        } catch (err) {
            return;
        }
    }
    else return;
    if (commandFile) {
        commandFile(message, arguments).catch(err => {
            log.error(`${message.author.tag} ran ${message.content} that resulted in: ${err}`);
        });
        try {
            countCommand(message.author.id, command);
        } catch (err) {
            log.error(`Error logging command: ${err}`);
        }
    }
}