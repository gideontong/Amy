const { snowflakes } = require('../config/config.json');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

module.exports = async guild => {
    log.info(`Joined new guild ${guild.name}`);
    try {
        if (guild.available) {
            let loggerGuild = guild.client.guilds.resolve(snowflakes.guilds.logging);
            if (loggerGuild) {
                let channel = loggerGuild.channels.resolve(snowflakes.channels.logging);
                if (channel && channel.type == 'text') {
                    const guildNotifcation = new MessageEmbed()
                        .setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL())
                        .setTitle(`Joined new server ${guild.name}`)
                        .setDescription(`Has ${guild.memberCount} members and was originally created on ${guild.createdAt}`)
                        .setFooter(`Joined at ${guild.joinedAt}`);
                    channel.send(guildNotifcation);
                }
            }
        }
    } catch (err) {
        log.error(`While trying to emite a guildCreate I got ${err}`);
    }
}