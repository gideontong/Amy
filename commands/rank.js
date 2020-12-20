const colors = 0xFFFFFF;

const { MessageEmbed } = require("discord.js");
const { getRank } = require("../lib/Achievement")

/**
 * Get a rank info
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if(args.length < 2) {
        msg.channel.send(`You need to give me a rank number to see its icon, like \`rank ${Math.random() < 0.5 ? '69': '42'}\`!`);
        return;
    }
    const rank = parseInt(args[1]);
    if (rank == NaN) {
        msg.channel.send('You... gave me something other than a rank number?');
        return;
    } else {
        const [available, data] = getRank(rank);
        if (available) {
            const embed = new MessageEmbed()
                .setColor(Math.floor(Math.random() * colors))
                .setDescription('Not much to say about ranks currently, but at least you can look at a pretty picture.')
                .setThumbnail(data.image)
                .setTitle(data.name);
            msg.channel.send(embed);
            return;
        } else {
            msg.channel.send('I searched far and wide and failed to find that rank number. Request it?');
            return;
        }
    }
}