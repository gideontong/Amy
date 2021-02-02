/**
 * See the bigger pictureTM
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const user = msg.mentions.users.size > 0 ? msg.mentions.users.first() : msg.author;
    if (user) {
        const url = user.avatarURL();
        if (url) {
            channel.send(url);
        } else {
            channel.send('That user does not seem to have a profile picture!');
        }
    } else {
        channel.send('That user does not seem to exist!');
    }
}