const { extractSnowflake } = require('../../lib/Validation');

/**
 * Pings a desired person with an annoying message
 * @param {Message} msg Message to execute
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;

    if (args.length < 2) {
        return channel.send({
            embed: {
                description: 'Tag a person in order to annoy them!'
            }
        });
    } else {
        const annoy = extractSnowflake(args[1]);
        if (annoy) {
            return channel.send({
                embed: {
                    description: `Hey, <@${annoy}>! Your breath smells!`
                }
            });
        } else {
            return channel.send({
                embed: {
                    description: 'You need to *tag* someone in the server to annoy them!'
                }
            });
        }
    }
}