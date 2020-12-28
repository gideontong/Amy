const link ='https://discord.gg/Mxa7kP82y4';

/**
 * Sends the Dudes of 708 server invite
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async(client, msg, args) => {
    msg.channel.send(link);
}