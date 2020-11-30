const colors = 0xFFFFFF;
const { MessageEmbed } = require('discord.js');

/**
 * How gay are you?
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    let mentions = msg.mentions.members;
    if (mentions) {
        let members = mentions.array();
        if (mentions.size == 0) {
            msg.reply(`you are ${Math.floor(Math.random() * 100)}% gay!`);
        } else if (mentions.size == 1) {
            msg.channel.send(`${members[0].toString()} is ${Math.floor(Math.random() * 100)}% gay!`);
        } else {
            let description = '';
            for (member of members) {
                description += `${member.toString()} is ${Math.floor(Math.random() * 100)}% gay!\n`;
            }
            const embed = new MessageEmbed()
                .setColor(Math.floor(Math.random() * colors))
                .setDescription(description)
                .setTitle('Gayness Table');
            msg.channel.send(embed);
        }
    }
}