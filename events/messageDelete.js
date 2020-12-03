const { prefix, channels } = require('../config/config.json');
const { exclusive } = require('../config/snowflakes.json');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Emits an alert when a user deletes a message from the cache
 * @param {Message} message Message that was deleted
 */
module.exports = async message => {
    if (message.author.bot || message.content.startsWith(prefix.amy)) return;
    log.info(`${message.author.tag} deleted ${message.id} from ${message.guild.name} (${message.channel.name})`);
    try {
        for (channelID of channels.logging) {
            let channel = message.client.channels.cache.get(channelID);
            if (channel && channel.type == 'text') {
                const deletedComment = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setTitle(`Message deleted in ${message.guild.name}!`)
                    .setDescription(message.content)
                    .setFooter(`Sent at ${message.createdAt} in ${message.channel.name} (${message.id})`)
                    .attachFiles(message.attachments.array());
                channel.send(deletedComment);
            }
        }
    } catch (err) {
        log.error(`While trying to emite a messageDelete I got ${err}`);
    }
    if (message.author.id == exclusive.leo && message.attachments.keyArray().length > 0) {
        response = new MessageEmbed()
            .setTitle('Leo, wait a second!')
            .setDescription('Do you remember that time we were together?')
            .setImage("https://amyhelps.ml/leo/" + Math.floor(Math.random() * 16) + ".jpg");
        message.channel.send(response);
    }
}