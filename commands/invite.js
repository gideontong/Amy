const link ='https://discord.gg/WUGMTcZ';

/**
 * Sends the Dudes of 708 server invite
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async(client, msg, args) => {
    msg.channel.send(link);
}