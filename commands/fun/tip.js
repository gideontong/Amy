const colors = 0xFFFFFF;
const { tips } = require('../../config/fun.json');
const { MessageEmbed } = require('discord.js');

/**
 * Returns a random tip
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    let index = Math.floor(Math.random() * tips.length);
    const color = Math.floor(Math.random() * colors);
    const quote = new MessageEmbed()
        .setColor(color);
    if (args[1] && !isNaN(args[1])) {
        let idx = parseInt(args[1]) - 1;
        if (idx < tips.length && idx > 0) {
            index = idx;
        }
    }
    quote.setDescription(`*${tips[index]}*`)
        .setFooter(`Try asking me for another tip!`)
        .setTitle(`Random Tip #${index + 1}`);
    msg.channel.send(quote);
}