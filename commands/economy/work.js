const colors = 0xFFFFFF;
const icon = 'https://media1.giphy.com/media/cYy90i7ZuUjByBCqGU/giphy.gif';

const { currency } = require('../../config/economy.json');
const { workJob } = require("../../lib/MemberLoad")
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Command to work for money
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    workJob(msg.author.id, msg.channel, function (award = 0, bonus = 0) {
        let embed = new MessageEmbed()
            .setColor(Math.floor(Math.random() * colors))
        if (award > 0) {
            embed
                .setDescription(`While working, you earned a total of ${currency}${award}!`)
                .setTitle('👩‍🏭 Work Complete!')
            if (Math.random() < 0.2) {
                embed
                    .setFooter("You've also discovered a small easter egg!")
                    .setThumbnail(icon);
            }
            if (bonus) {
                embed.addField('Bonus Awarded!', `Your bosses even decided that you were such a hard worker, that part of your salary was a ${currency}${bonus} bonus!`);
            }
        } else if (award < 0) {
            embed
                .setDescription(`You managed to lose money while working, causing you to spend ${currency}${Math.abs(award)}! Now that's unlucky.`)
                .setTitle('Right career field?');
        } else {
            embed
                .setDescription('Dang... your job doesn\'t pay very much? Sad.')
                .setTitle('No pay this time!')
        }
        msg.channel.send(embed);
        log.info(`${msg.author.tag} worked a job and earned ${award}`);
    });
}