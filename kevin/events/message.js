// Imports from local config files
const { prefix, guilds, probabilities } = require('../../config/config.json');
const { emotes, offline } = require('../../config/fun.json');
const permissions = require('../../config/permissions.json');

// Imports from dependencies
const log = require('log4js').getLogger('kevin');

const akovID = '727603104807256168';
const leoID = '756208954031341688';
const trollTime = 3;

/**
 * Handles messages for newly sent messages, parsing for commands and actions
 * @param {Message} message Message that was newly sent
 */
module.exports = async message => {
    if (message.author.bot) return;

    const channel = message.channel;
    if (message.content[0] == prefix.kevin) {
        commands = message.content.split(' ');
        toRun = commands[0].slice(1).toLowerCase();
        if (!RegExp(/^[a-z0-9]+$/i).test(toRun)) return;
        try {
            if (!permissions.users.admin.includes(message.author.id)) {
                if (permissions.commands.unreleased.includes(toRun)) {
                    return channel.send('Command coming soon!');
                } else if (permissions.commands.admin.includes(toRun)) {
                    return channel.send("You don't have permission to do that!");
                }
            }
            cmdFile = require(`../commands/${toRun}.js`);
        } catch {
            return log.warn(`${message.author.tag} ${message.author} tried to run invalid command ${message.content}`);
        }

        if (!cmdFile) {
            return log.warn(`${message.author.tag} ${message.author} tried to run nonexistent command ${message.content}`);
        } else {
            cmdFile(message, commands).catch(err => {
                return log.error(`${message.author.tag} ${message.author} ran ${message.content} that resulted in error ${err}`);
            })
        }
    } else if (guilds.enabled.includes(message.guild.id)) {
        if (message.content[0] == prefix.akov) {
            const filter = message => message.author.id == akovID;
            channel.awaitMessages(filter, { max: 1, time: trollTime * 1000, errors: ['time'] })
                .then(collected => { })
                .catch(collected => {
                    channel.send(offline.akov[Math.floor(Math.random() * offline.akov.length)]);
                });
        } else if (message.content[0] == prefix.leo) {
            const filter = message => message.author.id == leoID;
            channel.awaitMessages(filter, { max: 1, time: trollTime * 1000, errors: ['time'] })
                .then(collected => { })
                .catch(collected => {
                    channel.send(offline.leo[Math.floor(Math.random() * offline.leo.length)]);
                });
        }

        if (Math.random() < probabilities.reactChance) {
            message.react(emotes[Math.floor(Math.random() * emotes.length)]);
        }
    }
}