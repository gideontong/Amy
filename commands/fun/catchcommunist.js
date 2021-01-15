const top = 'https://i.imgur.com/48b7hZz.png';
const bottom = 'https://i.imgur.com/wPOAVwe.png';
const timeout = 600;

/**
 * Catch a communist pig
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