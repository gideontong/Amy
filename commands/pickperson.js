const log = require('log4js').getLogger('amy');

/**
 * Pick a random person in the channel
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (msg.channel.type == 'text') {
        let member = msg.channel.members.random();
        if (member) {
            msg.channel.send(`${member.toString()}, you have been chosen!`);
        } else {
            msg.channel.send("Couldn't pick a person from this channel! Something strange happened?");
            log.error('While trying to pick a member, it failed!');
        }
    }
}