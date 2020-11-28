const link = 'https://github.com/gideontong/Amy';

/**
 * Returns the GitHub link
 * @param {Client} client Discord client
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(`Check out Amy's GitHub repository here: ${link}`);
}