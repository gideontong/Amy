const filled = '▰';
const unfilled = '▱';
const colors = 0xFFFFFF;

const { getProfile } = require('../lib/Member');
const { MessageEmbed } = require('discord.js');

/**
 * Show the profile of the user
 * @param {Client} client Discord server client
 * @param {Message} msg Message command
 * @param {Array} args Array of arguments
 */
module.exports = async (client, msg, args) => {
    await getProfile(msg.author.id, function (data) {
        if (data) {
            const money = data.economy && data.economy.money ? data.economy.money : 0;
            const profile = new MessageEmbed()
                .addField('Favorite Command', 'placeholder')
                .addField('Level', 'placeholder', true)
                .addField('placeholder XP', 'placeholder placeholder', true)
                .addField('Achievements', 'placeholder')
                .addField('Money', `$${money}`, true)
                .addField('Server Rank', 'placeholder', true)
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
                .setColor(Math.floor(Math.random() * colors))
                .setDescription('placeholder')
                .setThumbnail('https://tabstats.com/images/r6/ranks/?rank=19')
                .setTimestamp()
                .setTitle(`${msg.member.nickname ? msg.member.nickname : msg.author.username}'s Public Profile`);
            msg.channel.send(profile);
        } else {
            msg.channel.send('Hmm... something went wrong. Either your profile does not exist or something worse. Ping an admin for help?');
        }
    });
}

function getRandomDescription(data) {
    // TODO: Return an ad sometimes if the user is not a premium user
}