const { prefix, channels } = require('../config/config.json');
const { tracked } = require('../config/snowflakes.json');
const { countAction } = require('../lib/Member');
const log = require('log4js').getLogger('amy');

/**
 * Emits an alert when a user deletes a message from the cache
 * @param {Message} message Message that was deleted
 */
module.exports = async message => {
    if (message.author.bot || message.content.startsWith(prefix.amy)) return;
    try {
        countAction(message.author.id, 'delete');
        if (!(message.guild && tracked.includes(message.guild.id))) return;
        for (channelID of channels.logging) {
            let channel = message.client.channels.cache.get(channelID);
            if (channel && channel.type == 'text') {
                const deletedComment = {
                    author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL()
                    },
                    title: `Message deleted in ${message.guild.name}!`,
                    description: message.content,
                    footer: {
                        text: `Originally sent at ${message.createdAt} in ${message.channel.name}`
                    }
                };
                channel.send({ embed: deletedComment });
            }
        }
    } catch (err) {
        log.error(`While trying to emite a messageDelete I got ${err}`);
    }
}