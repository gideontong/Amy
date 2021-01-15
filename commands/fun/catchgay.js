const top = 'https://i.imgur.com/RdiXD5N.png';
const bottom = 'https://i.imgur.com/nG67qex.png';
const timeout = 30;

/**
 * Catch a gay!
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const filter = message => {
        return !message.author.bot;
    }
    msg.channel.send(top)
        .then(message => {
            msg.channel.awaitMessages(filter, { max: 1, time: timeout * 1000, errors: ['time'] })
                .then(collected => {
                    msg.channel.send(bottom);
                })
                .catch(collected => {
                    message.delete();
                    msg.channel.send('...I am not sure there are any here. Try catching somewhere else?');
                });
        })
        .catch(err => { });
}