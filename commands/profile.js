const filled = '▰';
const unfilled = '▱';
const colors = 0xFFFFFF;

const { MessageEmbed } = require('discord.js');

/**
 * Show the profile of the user
 * @param {Client} client Discord server client
 * @param {Message} msg Message command
 * @param {Array} args Array of arguments
 */
module.exports = async (client, msg, args) => {
    const profile = new MessageEmbed()
        .addField('Favorite Command', 'placeholder')
        .addField('Level', 'placeholder', true)
        .addField('placeholder XP', 'placeholder placeholder', true)
        .addField('Achievements', 'placeholder')
        .addField('Money', 'placeholder')
        .addField('Server Rank', 'placeholder')
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setColor(Math.floor(Math.random() * colors))
        .setDescription('placeholder')
        .setThumbnail('https://tabstats.com/images/r6/ranks/?rank=19')
        .setTimestamp()
        .setTitle(`${msg.member.nickname}'s Public Profile`);
    msg.channel.send(profile);
}