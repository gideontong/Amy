const colors = 0xFFFFFF;

const { MessageEmbed } = require("discord.js");
const { getRank } = require("../../lib/Achievement")

/**
 * Get a rank info
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;

    if(args.length < 2) {
        return channel.send(`You need to give me a rank number to see its icon, like \`rank ${Math.random() < 0.5 ? '69': '42'}\`!`);
    }
    const rank = parseInt(args[1]);
    if (rank == NaN) {
        return channel.send({
            embed: {
                description: 'Is that a rank number? Make sure you provide a number!'
            }
        });
    } else {
        const [available, data] = getRank(rank);
        if (available) {
            const embed = new MessageEmbed()
                .setColor(Math.floor(Math.random() * colors))
                .setDescription('Not much to say about ranks currently, but at least you can look at a pretty picture.')
                .setThumbnail(data.image)
                .setTitle(data.name);
            return channel.send(embed);
        } else {
            return channel.send({
                embed: {
                    description: 'We don\'t have ranks that high just yet! Join the support server to let me know.'
                }
            });
        }
    }
}