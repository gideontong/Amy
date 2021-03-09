const tweets = require('../../config/trumptweets.json');

/**
 * Get a random Donald Trump tweet
 * @param {Message} msg Command
 * @param {Array} args Argument
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const tweet = tweets[Math.floor(Math.random() * tweets.length)];
    var text = tweet.text;
    if (text.startsWith('""') && text.endsWith('""')) {
        const splitLoc = text.indexOf(':');
        const rtAuthor = text.slice(3, splitLoc);
        text = `\`Retweeted \`[\`@${rtAuthor}\`](https://www.twitter.com/${rtAuthor})`
            + text.slice(splitLoc + 1, -2);
    }
    const embed = {
        description: text,
        color: 1942002,
        author: {
            name: "Donald Trump",
            icon_url: "https://i.imgur.com/t3iKIDZ.png?1"
        },
        footer: {
            text: `via ${tweet.device} on ${tweet.date}`
        }
    };
    channel.send({ embed: embed });
}