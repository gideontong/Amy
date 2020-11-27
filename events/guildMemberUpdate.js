const { guilds, channels } = require('../config/config.json');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Emits a server alert if someone changes their nickname
 * @param {GuildMember} oldMember Old member object before it was updated
 * @param {GuildMember} newMember New member object after it was updated
 */
module.exports = async (oldMember, newMember) => {
    if (newMember.guild.available && guilds.enabled.includes(newMember.guild.id)) {
        if (newMember.nickname) {
            log.info(`${newMember.user.tag} updated their nickname to ${newMember.nickname}`);
            let message = new MessageEmbed()
                .setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
                .setColor('GOLD')
                .setTitle('Nickname was updated!');
            if (oldMember.nickname) {
                message.setDescription(`Nickname was changed from ${oldMember.nickname} to ${newMember.nickname}.`);
            } else {
                message.setDescription(`A new nickname was added, which was ${newMember.nickname}.`);
            }
            for (channelID of channels.alert) {
                let channel = newMember.client.channels.cache.get(channelID);
                if (channel && channel.type == 'text') {
                    channel.send(message);
                }
            }
        }
    }
}