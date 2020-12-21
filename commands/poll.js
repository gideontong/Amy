const colors = 0xFFFFFF;
const msHours = 3600000;

const { emotes } = require('../config/config.json');
const { MessageEmbed } = require("discord.js");

/**
 * Create a poll for people to answer!
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 3 || isNaN(args[1])) {
        msg.channel.send('Welcome to polls beta! Use the command as follows: `poll <hours to expire> <question?>');
        return;
    }
    const hours = parseFloat(args[1]);
    if (hours < 0.01) {
        msg.channel.send('Your poll has to expire in the future! Try again?');
        return;
    } else if (hours > 24) {
        msg.channel.send('Currently, polls beta only supports polls up to 24 hours in the future. More options are coming soon!');
        return;
    }
    args.shift();
    args.shift();
    const message = args.join(' ');
    var embed = new MessageEmbed()
        .addField('Vote Tallies', 'coming soon')
        .setColor(Math.floor(Math.random() * colors))
        .setDescription(message)
        .setFooter(`This poll expires ~${Math.floor(hours)} hours after it starts.`)
        .setTitle(`${msg.member.nickname ? msg.member.nickname : msg.author.username} is starting a new poll!`);
    const filter = (reaction, user) => {
        return reaction.emoji.id == emotes.yes || reaction.emoji.id == emotes.no;
    }
    const time = Math.floor(hours * msHours);
    msg.channel.send(embed)
        .then(message => {
            message.react(emotes.yes);
            message.react(emotes.no);
            message.awaitReactions(filter, { time: time, errors: ['time'] })
                .then(collected => {
                    // Update the embed
                })
                .catch(collected => {
                    embed.setFooter('This poll has expired, and is no longer taking responses.');
                    message.edit(embed);
                });
        });
}