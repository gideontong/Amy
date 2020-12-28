const message = '(╯°□°）╯︵¯\\_(ツ)_/¯     ノ( ゜-゜ノ)';

/**
 * Flip a shruggie
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send(message);
}