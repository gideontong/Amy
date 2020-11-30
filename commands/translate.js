const host = 'api.mymemory.translated.net';
const endpoint = 'get';

const { request } = require('../lib/Internet');

/**
 * Attempts a machine translation
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 2) return;
    let string = msg.cleanContent.substr(args[0].length + 1);
    request(host, endpoint, 'GET', {
        'q': string,
        'langpair': 'en|es'
    }, function(data) {
        msg.channel.send(data.responseData.translatedText);
    });
}