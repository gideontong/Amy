const gold = 0xFFD700;

const { commands } = require('../../config/commands.json');
const { MessageEmbed } = require('discord.js');

/**
 * Get help for a command
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length < 2) {
        msg.channel.send('You need to provide me with a command to look up! Example: `command sudo`');
        return;
    }
    const command = commands[args[1]];
    if (command) {
        const embed = {
            title: `${command.command}: ${command.name}`,
            description: command.description,
            color: gold,
            fields: [
                {
                    name: 'Aliases',
                    value: command.alias.length ? command.alias.join() : 'No aliases for this command.'
                }
            ]
        };
        msg.channel.send({ embed: embed });
    } else {
        msg.channel.send("I couldn't find the command you were looking for. Check the commands list with `commands`?");
        return;
    }
}