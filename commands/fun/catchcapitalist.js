const top = 'https://i.imgur.com/Ya1MHxR.png';
const bottom = 'https://i.imgur.com/wPOAVwe.png';
const timeout = 600;

/**
 * Catch a capitalist pig
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
                .then(_ => {
                    channel.send(bottom)
                        .catch(_ => { });
                })

                .catch(_ => {
                    message.edit('...I am not sure there are any here. Try catching somewhere else?')
                        .catch(_ => { });
                });
        })
        .catch(_ => { });
}