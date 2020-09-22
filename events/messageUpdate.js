const { snowflakes } = require('../config/config.json');

const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

module.exports = async (oldMessage, newMessage) => {
    if (oldMessage.author.bot || newMessage.author.bot || !newMessage.editedAt) return;
    log.info(`${oldMessage.author.tag} edited ${oldMessage.cleanContent} to ${newMessage.cleanContent} in ${oldMessage.guild.name} (${oldMessage.channel.name})`);
    let guild = oldMessage.client.guilds.resolve(snowflakes.guilds.logging);
    try {
        if (guild.available) {
            let channel = guild.channels.resolve(snowflakes.channels.logging);
            if (channel && channel.type == 'text') {
                const editedComment = new MessageEmbed()
                    .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
                    .setTitle(`Message edited in ${oldMessage.guild.name}!`)
                    .setDescription(`It had ${oldMessage.attachments.size} attachments.`)
                    .addField('Old Message', oldMessage.cleanContent, false)
                    .addField('New Message', newMessage.cleanContent, false)
                    .setFooter(`Edited at ${newMessage.editedAt} in ${oldMessage.channel.name}`);
                channel.send(editedComment);
            }
        }
    } catch (err) {
        log.error(`While trying to emit a messageUpdate I got ${err}`);
    }
}