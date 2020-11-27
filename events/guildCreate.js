const { logging } = require('../config/config.json').channels;
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Creates an alert when the bot joins a new server
 * @param {Guild} guild The guild that was joined
 */
module.exports = async guild => {
    const client = guild.client;
    log.info(`Joined new guild ${guild.name}`);
    try {
        if (guild.available) {
            const notification = new MessageEmbed()
                .setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL())
                .setTitle(`Joined new server ${guild.name}`)
                .setDescription(`Has ${guild.memberCount} members and was originally created on ${guild.createdAt}`)
                .setFooter(`Joined at ${guild.joinedAt}`);
            for (channelID of logging) {
                let channel = client.channels.cache.get(channelID);
                if (channel && channel.type == 'text') {
                    channel.send(notification);
                }
            }
        }
    } catch (err) {
        log.error(`While trying to emite a guildCreate I got ${err}`);
    }
}