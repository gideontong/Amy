const colors = 0xFFFFFF;
const { quotes } = require('../config/fun.json');
const { MessageEmbed } = require('discord.js');

/**
 * Returns a random quote
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    let index = Math.floor(Math.random() * quotes.length);
    const color = Math.floor(Math.random() * colors);
    const quote = new MessageEmbed()
        .setColor(color);
    if (args[1] && !isNaN(args[1])) {
        let idx = parseInt(args[1]) - 1;
        if (idx < quotes.length && idx > 0) {
            index = idx;
        }
    }
    quote.setDescription(`*${quotes[index].text}*`)
        .setFooter(`- ${quotes[index].author}`)
        .setTitle(`Random Quote #${index + 1}`);
    msg.channel.send(quote);
}