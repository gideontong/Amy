const { snowflakes } = require('../config/config.json');

const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

module.exports = async (oldMessage, newMessage) => {
    if (oldMessage.author.bot || newMessage.author.bot || !newMessage.editedAt) return;
    let original = oldMessage.cleanContent;
    let updated = newMessage.cleanContent;
    log.info(`${oldMessage.author.tag} edited ${original} to ${updated} in ${oldMessage.guild.name} (${oldMessage.channel.name})`);
    let guild = oldMessage.client.guilds.resolve(snowflakes.guilds.logging);
    try {
        if (guild.available) {
            let channel = guild.channels.resolve(snowflakes.channels.logging);
            if (channel && channel.type == 'text') {
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
                channel.send(editedComment);
            }
        }
    } catch (err) {
        log.error(`While trying to emit a messageUpdate I got ${err}`);
    }
}