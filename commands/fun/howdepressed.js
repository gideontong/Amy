const colors = 0xFFFFFF;
const { MessageEmbed } = require('discord.js');

/**
 * How depressed are you?
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;

    let mentions = msg.mentions.members;
    if (mentions) {
        let members = mentions.array();
        if (mentions.size == 0) {
            return channel.send({
                embed: {
                    description: `You are ${Math.floor(Math.random() * 100)}% depressed!`
                }
            });
        } else if (mentions.size == 1) {
            return channel.send({
                embed: {
                    description: `${members[0].toString()} is ${Math.floor(Math.random() * 100)}% depressed!`
                }
            });
        } else {
            let description = '';
            for (member of members) {
                description += `${member.toString()} is ${Math.floor(Math.random() * 100)}% depressed!\n`;
            }
            const embed = new MessageEmbed()
                .setColor(Math.floor(Math.random() * colors))
                .setDescription(description)
                .setTitle('Depression Index Fund');
            return channel.send(embed);
        }
    }
}