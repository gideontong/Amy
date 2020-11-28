const link = 'https://www.youtube.com/playlist?list=PL3q1l2_RQCr7fk0jyOmNwiUp9F6CaDyQd';

/**
 * Returns the insane aslyum playlist
 * @param {Client} client Discord client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(`You want it, you got it: ${link}`);
    log.info(`${msg.author.tag} ${msg.author} rquested the insane aslyum playlist`);
}