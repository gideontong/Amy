const tweets = require('../../config/trumptweets.json');

/**
 * Get a random Donald Trump tweet
 * @param {Message} msg Command
 * @param {Array} args Argument
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const tweet = tweets[Math.floor(Math.random() * tweets.length)];
    const embed = {
        description: tweet.text,
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