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

const { probabilities } = require('../config/config.json');
const { antinsfw } = require('../config/responses.json');
const { getRedditImage } = require('../../lib/Internet');
const log = require('log4js').getLogger('amy');

/**
 * Undocumented command, returns a random NSFW image
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (msg.channel.type == 'text' && msg.channel.nsfw) {
        if (Math.random() < probabilities.blockNSFW) {
            msg.channel.send(antinsfw[Math.floor(Math.random() * antinsfw.length)]);
            return;
        }
        try {
            getRedditImage(function (data = 'Loading...') {
                msg.channel.send(data);
            }, subreddits);
        } catch (err) {
            log.error(`While trying to grab a Reddit NSFW picture I got ${err}`);
        }
    } else {
        msg.channel.send('NSFW images are only allowed in NSFW channels... you sick bastard.');
    }
}