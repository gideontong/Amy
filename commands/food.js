const host = 'www.reddit.com';
// Have a suggestion? File a pull request or contact Gideon#5433!
const subreddits = [
    'beerandpizza',
    'beerfood',
    'beerporn',
    'bobsburgerscreations',
    'burgers',
    'cheeseburgers',
    'food',
    'foodporn',
    'friedchicken',
    'knightsofpineapple',
    'microwavepics',
    'pizza',
    'putaneggonit',
    'ramen',
    'salsasnobs',
    'sexypizza',
    'streeteats',
    'streetfoodartists',
    'sushi',
    'swedishfood',
    'tacos',
    'tonightsdinner',
    'tonightsvegdinner',
    'wings'
];

const { getRedditImage } = require('../lib/Internet');
const log = require('log4js').getLogger('amy');

/**
 * Gets a random photo from a food subreddit
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    try {
        msg.channel.send(getRedditImage(function (data) {
            log.info('attempting to send' + data);
            msg.channel.send(data);
        }, subreddits));
    } catch (err) {
        log.error(`While trying to grab a Reddit food picture I got ${err}`);
    }
}