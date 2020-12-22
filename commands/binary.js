const colors = 0xFFFFFF;

const { MessageEmbed } = require("discord.js");

/**
 * Convert text to binary
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async(client, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('You need to give me something to convert!');
        return;
    } else if (args.length == 2 && !isNaN(args[1])) {
        const number = parseFloat(args[1]);
        const embed = new MessageEmbed()
            .addField('Decimal', number, true)
            .addField('Binary', number.toString(2), true)
            .setColor(Math.floor(Math.random() * colors))
            .setTitle('Automatic Number Conversion');
        msg.channel.send(embed);
        return;
    } else {
        const text = msg.content.substring(args[0].length + 1);
        let output = [];
        for (let i = 0; i < text.length; i++) {
            const bin = text[i].charCodeAt().toString(2);
            output.push(Array(8 - bin.length + 1).join('0') + bin);
        }
        message.channel.send(output.join(' '));
        return;
    }
}