const top = 'https://i.imgur.com/RdiXD5N.png';
const bottom = 'https://i.imgur.com/nG67qex.png';
const timeout = 600;

/**
 * Catch a gay!
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const filter = message => {
        return !message.author.bot;
    }
    channel.send(top)
        .then(message => {
            channel.awaitMessages(filter, { max: 1, time: timeout * 1000, errors: ['time'] })
                .then(collected => {
                    channel.send(bottom);
                })
                .catch(collected => {
                    message.edit('...I am not sure there are any here. Try catching somewhere else?')
                        .catch(err => { });
                });
        })
        .catch(err => { });
}