const colors = 0xFFFFFF;

const { emotes } = require('../config/config.json');
const { MessageEmbed } = require("discord.js");

/**
 * Create a poll for people to answer!
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(args.length + ' ' +  args[1] + ' ' + !isNaN(args[1]))
    if (args.length < 3 || !isNaN(args[1])) {
        msg.channel.send('Welcome to polls beta! Use the command as follows: `poll <hours to expire> <question?>');
        return;
    }
    const hours = parseInt(args[1]);
    if (hours < 0) {
        msg.channel.send('Your poll has to expire in the future! Try again?');
        return;
    } else if (hours > 24) {
        msg.channel.send('Currently, polls beta only supports polls up to 24 hours in the future. More options are coming soon!');
        return;
    }
    args.shift();
    args.shift();
    const message = args.join(' ');
    const embed = new MessageEmbed()
        .addField('Vote Tallies', 'coming soon')
        .setColor(Math.floor(Math.random() * colors))
        .setDescription(message)
        .setFooter(`This poll expires ${hours} hours after it starts.`)
        .setTitle(`${msg.member.nickname ? msg.member.nickname : msg.author.username} is starting a new poll!`);
    msg.channel.send(embed)
        .then(message => {
            message.react(emotes.yes);
            message.react(emotes.no);
        });
}