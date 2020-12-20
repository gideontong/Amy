const filled = '▰';
const unfilled = '▱';
const colors = 0xFFFFFF;

const { currency } = require('../config/economy.json');
const { getProfile } = require('../lib/Member');
const { calculateLevel, getRank } = require('../lib/Achievement');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Show the profile of the user
 * @param {Client} client Discord server client
 * @param {Message} msg Message command
 * @param {Array} args Array of arguments
 */
module.exports = async (client, msg, args) => {
    log.info(`Attempting to get profile for ${msg.author.tag}`);
    let snowflake = msg.author.id;
    let member = msg.member;
    if (args.length > 1) {
        if (msg.mentions.members && msg.mentions.members.size > 0) {
            snowflake = msg.mentions.members.firstKey();
            member = msg.mentions.members.first();
            if (member.user.bot) {
                msg.channel.send("Bots aren't allowed to have profiles!");
                return;
            }
        }
    }
    msg.channel.send('Looking for a profile, please wait...')
        .then(async sent => {
            await getProfile(snowflake, function (data) {
                if (data) {
                    const [level, xp, progress] = calculateLevel(data.statistics.messages,
                        data.statistics.reactions,
                        data.statistics.commands.count);
                    const money = data.economy && data.economy.money ? data.economy.money : 0;
                    const rank = getRank(level);
                    const profile = new MessageEmbed()
                        .addField('Favorite Command', getFavoriteCommand(data))
                        .addField('Level', level, true)
                        .addField(`${xp} XP`, buildProgressString(progress), true)
                        .addField('Achievements', `${data.achievements ? data.achievements.length : 0} unlocked`)
                        .addField('Money', `${currency}${money}`, true)
                        .addField('Server Rank', rank[1].name, true)
                        .setAuthor(member.user.tag, member.user.displayAvatarURL())
                        .setColor(Math.floor(Math.random() * colors))
                        .setDescription(getRandomDescription(data))
                        .setThumbnail(rank[0] ? rank[1].image : '')
                        .setTimestamp()
                        .setTitle(`${member.nickname ? member.nickname : member.user.username}'s Public Profile`);
                    sent.edit(getRandomContent(), profile);
                } else {
                    sent.edit('Hmm... something went wrong. Either your profile does not exist or something worse. Ping an admin for help?');
                }
            });
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
    const bars = Math.floor(percentage / 8);
    return `${filled.repeat(bars)}${unfilled.repeat(8 - bars)} ${percentage}%`;
}

/**
 * Gets a random description for the user
 * @param {Object} data Profile document
 */
function getRandomDescription(data) {
    // TODO: Return an ad sometimes if the user is not a premium user
    const roll = Math.floor(Math.random() * 4);
    if (roll == 0) {
        return `You have deleted ${data.statistics.deleted} messages so far!`;
    } else if (roll == 1) {
        return `You have earned ${currency}${data.economy.earned} so far!`;
    } else if (roll == 2) {
        return `You have spent ${currency}${data.economy.spent} so far!`;
    } else if (roll == 3) {
        return `You have ran ${data.statistics.commands.count} commands!`;
    } else {
        return "I don't have any fun facts about you yet.";
    }
}

/**
 * Gets a random edit message
 * @param {Boolean} adsEnabled Ads enabled
 */
function getRandomContent(adsEnabled = true) {
    return 'This feature is in heavy development. Submit feature requests with the `github` command.'
}