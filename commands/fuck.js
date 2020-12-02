// You are a sick person. This list was auto-generated, and I
// don't want to see it ever again.
const subreddits = [
    '18_19',
    'asianhotties',
    'asiansgonewild',
    'collegesluts',
    'celebnsfw',
    'girlsinyogapants',
    'nsfw',
    'palegirls',
    'realgirls'
];

const { getRedditImage } = require('../lib/Internet');
const log = require('log4js').getLogger('amy');

/**
 * Undocumented command, returns a random NSFW image
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    try {
        getRedditImage(function (data = 'Loading...') {
            msg.channel.send(data);
        }, subreddits);
    } catch (err) {
        log.error(`While trying to grab a Reddit NSFW picture I got ${err}`);
    }
}