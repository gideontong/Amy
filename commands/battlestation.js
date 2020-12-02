const host = 'www.reddit.com';
const endpoint = '/r/battlestations/random.json'

const { authenticatedGet } = require('../lib/Internet');
const log = require('log4js').getLogger('amy');

/**
 * Returns a random battlestation
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    try {
        authenticatedGet(function (data) {
            if (data
                && data.length > 0
                && data[0]
                && data[0].data
                && data[0].data.children
                && data[0].data.children.length > 0
                && data[0].data.children[0].data
                && data[0].data.children[0].data.url_overridden_by_dest) {
                const link = data[0].data.children[0].data.url_overridden_by_dest;
                if (link.startsWith('https://www.reddit.com')) {
                    msg.channel.send(`Check out this Reddit gallery (auto-gallery coming soon!): ${link}`);
                } else {
                    msg.channel.send(link);
                }
            } else {
                msg.channel.send("That didn't work... try again?");
            }
        }, host, endpoint, {}, {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
        });
    } catch (err) {
        log.error(`While trying to grab a Reddit battlestation I got ${err}`);
    }
}