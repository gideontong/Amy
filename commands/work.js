const colors = 0xFFFFFF;
const icon = 'https://media1.giphy.com/media/cYy90i7ZuUjByBCqGU/giphy.gif';

const { currency } = require('../config/economy.json');
const { workJob } = require("../lib/MemberLoad")
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Command to work for money
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    workJob(msg.author.id, msg.channel, function (award = 0, bonus = 0) {
        if (award) {
            let embed = new MessageEmbed()
                .setColor(Math.floor(Math.random() * colors))
                .setDescription(`While working, you earned a total of ${currnecy}${award}!`)
                .setTitle('👩‍🏭 Work Complete!')
            if (Math.random() < 0.2) {
                embed
                    .setFooter("You've also discovered a small easter egg!")
                    .setThumbnail(icon);
            }
            if (bonus) {
                embed.addField('Bonus Awarded!', `Your bosses even decided that you were such a hard worker, that part of your salary was a ${currency}${bonus} bonus!`);
            }
            msg.channel.send(embed);
        }
        log.info(`${msg.author.tag} worked a job and earned ${award}`);
    });
}