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
            let channel = client.channels.cache.get(logging);
            if (channel && channel.type == 'text') {
                const notification = new MessageEmbed()
                    .setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL())
                    .setTitle(`Left server ${guild.name}`)
                    .setDescription(`Has ${guild.memberCount} members and was originally created on ${guild.createdAt}`)
                    .setFooter(`Originally joined at ${guild.joinedAt}`);
                channel.send(notification);
            }
        }
    } catch (err) {
        log.error(`While trying to emite a guildDelete I got ${err}`);
    }
}