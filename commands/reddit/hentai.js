// You are a sick person. This list was auto-generated, and I
// don't want to see it ever again.
const subreddits = [
    'ahegao',
    'animebooty',
    'animehandbras',
    'animemilfs',
    'awwnime',
    'chiisaihentai',
    'cumhentai',
    'doujinshi',
    'ecchi',
    'futanari',
    'hentai_gif',
    'hentai',
    'hentaibondage',
    'hentaimemes',
    'kanmusunights',
    'kuroihada',
    'nekomimi',
    'nsfwanimegifs',
    'overwatch_porn',
    'paizuri',
    'pokeporn',
    'rule34',
    'rule34lol',
    'rwbynsfw',
    'sex_comics',
    'sukebei',
    'swimsuithentai',
    'thighdeology',
    'uniform_hentai',
    'upskirthentai',
    'waifusgonewild',
    'western_hentai',
    'yuri',
    'yurigif',
    'zettairyouiki'
];

const { probabilities } = require('../../config/config.json');
const { antinsfw } = require('../../config/fun.json');
const { getRandomImage } = require('../../lib/Reddit');
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
            getRandomImage(function (data = 'Loading...') {
                msg.channel.send(data);
            }, subreddits);
        } catch (err) {
            log.error(`While trying to grab a Reddit NSFW picture I got ${err}`);
        }
    } else {
        msg.channel.send('NSFW images are only allowed in NSFW channels... you sick bastard.');
    }
}