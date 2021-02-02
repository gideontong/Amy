const { pageSearch } = require('../../lib/Wikipedia');

/**
 * Get some text from Wikipedia
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    args.shift();
    const query = args.join(' ');
    pageSearch(function (title, text) {
        if (text.length > 0) {
            const embed = {
                title: title,
                description: text,
                url: `https://en.wikipedia.org/wiki/${title}`,
                color: 9624918,
                author: {
                    name: 'Wikipedia (English)',
                    icon_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/220px-Wikipedia-logo-v2.svg.png'
                },
                footer: {
                    text: 'Powered by Amy. Closest match found.'
                }
            };
            return channel.send({ embed: embed });
        } else {
            const embed = {
                description: "I searched far and wide, but I couldn't find a similar match or a suitable match to the thing you were searching. You might want to try again?",
                color: 16711680,
                author: {
                    name: 'Wikipedia Has Failed!',
                    icon_url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/220px-Wikipedia-logo-v2.svg.png"
                },
                footer: {
                    text: 'Powered by Amy. Try a new search?'
                }
            };
            return channel.send({ embed: embed });
        }
    }, query);
}