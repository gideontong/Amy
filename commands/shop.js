const currency = '<a:currency:789567509736456203>'

const { MessageEmbed } = require("discord.js")

module.exports = async (client, msg, args) => {
    const embed = new MessageEmbed()
        .setDescription(`${currency}100 example item\n`.repeat(4))
        .setTitle('Store DEMO MODE');
    msg.channel.send(embed);
}