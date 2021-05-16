const { simplePost } = require('../../lib/Internet');

const host = 'localhost';
const port = 7075;
const endpoint = '/complete_text';

/**
 * Message for the record
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;

    args.shift();
    const message = args.join(' ');

    simplePost(function (result) {
        try {
            channel.send(result.result);
        } catch (err) {
            channel.send({
                embed: {
                    description: 'Something went wrong. Have Gideon investigate?'
                }
            });
        }
    }, host, port, endpoint, {
        text: message
    });
}