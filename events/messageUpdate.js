const { logging } = require('../config/config.json').channels;
const { tracked } = require('../config/snowflakes.json');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Sends an alert whenever a message is edited
 * @param {Message} oldMessage Message before it was edited
 * @param {Message} newMessage Message after it was edited
 */
module.exports = async (oldMessage, newMessage) => {
    if (!(message.guild && tracked.includes(message.guild.id))) return;
    if (newMessage.author.bot || !newMessage.editedAt) return;
    try {
        log.info(`${oldMessage.author.tag} edited ${newMessage.id} in ${oldMessage.guild.name} (${oldMessage.channel.name})`);
        let original = oldMessage.cleanContent;
        let updated = newMessage.cleanContent;
        if (original.length > 500) {
            original = original.substring(0, 500) + '...';
        }
        if (updated.length > 500) {
            updated = updated.substring(0, 500) + '...';
        }
        const editedComment = new MessageEmbed()
            .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
            .setTitle(`Message edited in ${oldMessage.guild.name}!`)
            .setDescription(`It had ${oldMessage.attachments.size} attachments.`)
            .addField('Old Message', original, false)
            .addField('New Message', updated, false)
            .setFooter(`Edited at ${newMessage.editedAt} in ${oldMessage.channel.name}`);
        for (channelID of logging) {
            let channel = newMessage.client.channels.cache.get(channelID);
            if (channel && channel.type == 'text') {
                channel.send(editedComment);
            }
        }
    } catch (err) {
        log.error(`While trying to emit a messageUpdate I got ${err}`);
    }
}