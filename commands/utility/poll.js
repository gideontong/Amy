const colors = 0xFFFFFF;
const msHours = 3600000;

const { emotes } = require('../../config/config.json');
const { MessageEmbed } = require('discord.js');

/**
 * Create a poll for people to answer!
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length < 3) {
        msg.channel.send('Welcome to polls beta! Use the command as follows: `poll <hours to expire> <question?>`');
        return;
    }
    const hours = isNaN(args[1]) ? 1 : parseFloat(args[1]);
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
        .addField('Vote Tallies', 'No one has voted yet!')
        .setColor(Math.floor(Math.random() * colors))
        .setDescription(message)
        .setFooter(`This poll expires ${hours < 1.5 ? Math.floor(hours * 60) : Math.round(hours)} ${hours < 1.5 ? 'minutes' : 'hours'} after it starts.`)
        .setTitle(`${msg.member.nickname ? msg.member.nickname : msg.author.username} is starting a new poll!`);
    const options = [emotes.yes, emotes.no, emotes.maybe];
    const filter = (reaction, user) => {
        return options.some(emoji => emoji == reaction.emoji.id);
    }
    const time = Math.floor(hours * msHours);
    msg.channel.send(embed)
        .then(message => {
            message.react(emotes.yes);
            message.react(emotes.no);
            message.react(emotes.maybe);
            const collector = message.createReactionCollector(filter, { dispose: true, time: time });
            let answers = [0, 0, 0];
            collector.on('collect', function (reaction, user) {
                if (user.bot)
                    return;
                if (reaction.emoji.id == emotes.yes) {
                    answers[0]++;
                } else if (reaction.emoji.id == emotes.no) {
                    answers[1]++;
                } else if (reaction.emoji.id == emotes.maybe) {
                    answers[2]++;
                }
                embed
                    .spliceFields(0, 1)
                    .addField('Vote Tallies', getTallies(answers));
                message.edit(embed);
            });
            collector.on('remove', function (reaction, user) {
                if (user.bot)
                    return;
                if (reaction.emoji.id == emotes.yes) {
                    answers[0]--;
                } else if (reaction.emoji.id == emotes.no) {
                    answers[1]--;
                } else if (reaction.emoji.id == emotes.maybe) {
                    answers[2]--;
                }
                embed
                    .spliceFields(0, 1)
                    .addField('Vote Tallies', getTallies(answers));
                message.edit(embed);
            });
            collector.on('end', collected => {
                embed.setFooter('This poll has expired, and is no longer taking responses.');
                message.edit(embed);
            });
        });
}

/**
 * Get tallies string
 * @param {Number[]} answers Count of answers
 */
function getTallies(answers) {
    const sum = answers.reduce((acc, tot) => acc + tot);
    if (sum == 0) {
        return 'No one has voted yet!';
    }
    let percentage = new Array();
    answers.forEach(answer => {
        percentage.push(Math.round(100 * answer / sum));
    });
    let strings = [
        `<a:yes:${emotes.yes}> ${yes} Votes (${percentage[0]}%)`,
        `<a:no:${emotes.no}> ${no} Votes (${percentage[1]}%)`,
        `<a:maybe:${emotes.maybe}> ${maybe} Votes (${percentage[2]}%)`
    ];
    return strings.join('\n');
}