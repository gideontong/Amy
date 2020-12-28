const colors = 0xFFFFFF;

const { getCommand } = require('../lib/Help');
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
    const command = getCommand({ command: args[1] });
    if (command) {
        const embed = new MessageEmbed()
            .addField('Aliases', command.alias.length ? command.alias.join() : 'No aliases for this command.')
            .setColor(Math.floor(Math.random() * colors))
            .setDescription(command.description)
            .setTitle(`${command.command}: ${command.name}`);
        msg.channel.send(embed);
    } else {
        msg.channel.send("I couldn't find the command you were looking for. Check the commands list with `commands`?");
        return;
    }
}