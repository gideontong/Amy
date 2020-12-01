const colors = 0xFFFFFF;

const { logging } = require('../config/config.json').channels;
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Creates an alert when the bot is kicked from a server
 * @param {Guild} guild The guild that was left
 */
module.exports = async guild => {
    log.info(`Left guild ${guild.name}`);
    try {
        if (guild.available) {
            const notification = new MessageEmbed()
                .setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL())
                .setColor(Math.floor(Math.random() * colors))
                .setTitle(`Left server ${guild.name}`)
                .setDescription(`Has ${guild.memberCount} members and was originally created on ${guild.createdAt}`)
                .setFooter(`Originally joined at ${guild.joinedAt}`);
            for (channelID of logging) {
                let channel = guild.client.channels.cache.get(channelID);
                if (channel && channel.type == 'text') {
                    channel.send(notification);
                }
            }
        }
    } catch (err) {
        log.error(`While trying to emite a guildDelete I got ${err}`);
    }
}