// Have a suggestion? File a pull request or contact Gideon#5433!
const subreddits = [
    'beerandpizza',
    'breadit',
    'bobsburgerscreations',
    'burgers',
    'cheeseburgers',
    'food',
    'foodporn',
    'pizza',
    'ramen',
    'soup',
    'sushi',
    'tacos'
];

const { getRandomImage } = require('../../lib/Reddit');
const log = require('log4js').getLogger('amy');

/**
 * Gets a random photo from a food subreddit
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    try {
        getRandomImage(function (data = 'Loading...') {
            msg.channel.send(data);
        }, subreddits);
    } catch (err) {
        log.error(`While trying to grab a Reddit food picture I got ${err}`);
    }
}