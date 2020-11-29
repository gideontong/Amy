const colors = 0xFFFFFF;
const { quotes } = require('../config/fun.json');
const { MessageEmbed } = require('discord.js');

/**
 * Returns a random quote
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    const index = Math.floor(Math.random() * quotes.length);
    const color = Math.floor(Math.random() * colors);
    const quote = new MessageEmbed()
        .setColor(color)
        .setDescription(`*${quotes[index].text}*`)
        .setFooter(`- ${quotes[index].author}`)
        .setTitle(`Random Quote #${index + 1}`);
    msg.channel.send(quote);
}