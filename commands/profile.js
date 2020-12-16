const filled = '▰';
const unfilled = '▱';
const colors = 0xFFFFFF;

const { getProfile } = require('../lib/Member');
const { calculateLevel } = require('../lib/Achievement');
const { MessageEmbed } = require('discord.js');

/**
 * Show the profile of the user
 * @param {Client} client Discord server client
 * @param {Message} msg Message command
 * @param {Array} args Array of arguments
 */
module.exports = async (client, msg, args) => {
    // TODO: Have loading message while it loads
    await getProfile(msg.author.id, function (data) {
        if (data) {
            const [level, xp, progress] = calculateLevel(data.statistics.messages,
                data.statistics.reactions,
                data.statistics.commands.count);
            const money = data.economy && data.economy.money ? data.economy.money : 0;
            const profile = new MessageEmbed()
                .addField('Favorite Command', getFavoriteCommand(data))
                .addField('Level', level, true)
                .addField(`${xp} XP`, buildProgressString(progress), true)
                .addField('Achievements', 'placeholder')
                .addField('Money', `$${money}`, true)
                .addField('Server Rank', 'placeholder', true)
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
                .setColor(Math.floor(Math.random() * colors))
                .setDescription(getRandomDescription(data))
                .setThumbnail('https://tabstats.com/images/r6/ranks/?rank=19')
                .setTimestamp()
                .setTitle(`${msg.member.nickname ? msg.member.nickname : msg.author.username}'s Public Profile`);
            msg.channel.send(profile);
        } else {
            msg.channel.send('Hmm... something went wrong. Either your profile does not exist or something worse. Ping an admin for help?');
        }
    });
}

/**
 * Finds and maps the favorite command
 * @param {Object} data Profile document
 */
function getFavoriteCommand(data) {
    const error = 'Could not find favorite command!';
    if (data
        && data.statistics
        && data.statistics.commands
        && data.statistics.commands.usage) {
            let command = '';
            let high = 0;
            Object.entries(data.statistics.commands.usage).forEach(([key, value]) => {
                if (value > high) {
                    command = key;
                    high = value;
                }
            })
            if (command && high) {
                return command;
            } else {
                return error;
            }
    } else {
        return error;
    }
}

/**
 * Builds a progress string
 * @param {Number} progress Progress value
 */
function buildProgressString(progress) {
    const percentage = Math.floor(progress * 10);
    const bars = Math.floor(percent / 8);
    return `${filled.repeat(bars)}${unfilled.repeat(8 - bars)} ${percentage}%`;
}

/**
 * Gets a random description for the user
 * @param {Object} data Profile document
 */
function getRandomDescription(data) {
    // TODO: Return an ad sometimes if the user is not a premium user
    return 'placeholder';
}