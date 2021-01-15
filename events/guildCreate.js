const colors = 0xFFFFFF;

const { logging } = require('../config/config.json').channels;
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
            const embed = {
                title: `Joined new server ${guild.name}`,
                author: {
                    name: guild.owner.user.tag,
                    icon_url: guild.owner.user.displayAvatarURL()
                },
                color: Math.floor(Math.random() * colors),
                description: `Has ${guild.memberCount} members and was originally created on ${guild.createdAt}.`,
                footer: {
                    text: `Joined at ${guild.joinedAt}`
                }
            };
            for (channelID of logging) {
                let channel = client.channels.cache.get(channelID);
                if (channel && channel.type == 'text') {
                    channel.send({ embed: embed });
                }
            }
        }
    } catch (err) {
        log.error(`While trying to emite a guildCreate I got ${err}`);
    }
}