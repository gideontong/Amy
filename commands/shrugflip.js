const message = '(╯°□°）╯︵¯\_(ツ)_/¯     ノ( ゜-゜ノ)';

/**
 * Flip a shruggie
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(message);
}