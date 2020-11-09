// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

// Handler for a deleted message
module.exports = async message => {
    if (message.author.bot || message.content.startsWith(config.prefix)) return;
    log.info(`${message.author.tag} deleted "${message.cleanContent}" from ${message.guild.name} (${message.channel.name})`);
    let guild = message.client.guilds.resolve(config.snowflakes.guilds.logging);
    try {
        if (guild.available) {
            let channel = guild.channels.resolve(config.snowflakes.channels.logging);
            if (channel && channel.type == 'text') {
                const deletedComment = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setTitle(`Message deleted in ${message.guild.name}!`)
                    .setDescription(message.content)
                    .setFooter(`${message.createdAt} in ${message.channel.name}`);
                channel.send(deletedComment);
                let attachments = message.attachments.array();
                if (attachments.length > 0) {
                    s = ''
                    attachments.forEach(element => s += element.url + '\n')
                    const deletedAttachments = new MessageEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setTitle("The last deleted message also contained attachments!")
                        .setDescription(`**Guild:** ${message.guild.name}\n**Message ID:** ${message.id}\n\n__Attachments__\n${s}`)
                        .setFooter(`${message.createdAt} in ${message.channel.name}`);
                    channel.send(deletedAttachments);
                }
            }
        }
    } catch (err) {
        log.error(`While trying to emite a messageDelete I got ${err}`);
    }
    if (message.author.id == targets.leo && message.attachments.keyArray().length > 0) {
        response = new MessageEmbed()
            .setTitle('Leo, wait a second!')
            .setDescription('Do you remember that time we were together?')
            .setImage("https://amyhelps.ml/leo/" + Math.floor(Math.random() * 16) + ".jpg");
        message.channel.send(response);
    }
}