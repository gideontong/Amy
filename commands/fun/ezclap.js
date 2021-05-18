const emotes = '<:EZ:809906880062685265> <a:clap:809906878225055744>';

/**
 * EZ clap
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    channel.send(emotes)
        .catch(_ => { });
}