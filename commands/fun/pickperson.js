const log = require('log4js').getLogger('amy');

/**
 * Pick a random person in the channel
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (msg.channel.type == 'text') {
        let member;
        do {
            member = msg.channel.members.random();
        } while (member.user.bot);
        if (member) {
            msg.channel.send(`${member.toString()}, you have been chosen!`);
        } else {
            msg.channel.send("Couldn't pick a person from this channel! Something strange happened?");
            log.error('While trying to pick a member, it failed!');
        }
    }
}