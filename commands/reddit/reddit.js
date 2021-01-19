const errorNSFW = {
    title: 'Error: NSFW?',
    description: 'I found a post, but it was marked as NSFW. Amy doesn\'t support NSFW Reddit posts at the moment. If the subreddit is not NSFW, you can try again.',
    color: 16711680,
    footer: {
        text: 'This post was brought to you by the anti-horny gang.'
    }
};
const allowedEndings = ['.png', '.jpg', '.gif', '.jpeg'];

const { getRandomPost, postToImage } = require('../../lib/Reddit');

/**
 * Get a command
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length != 2) {
        msg.channel.send('You need to provide me a subreddit to find a random post from!');
        return;
    }
    const subreddit = encodeURIComponent(args[1]);
    getRandomPost(subreddit, function (data) {
        if (data) {
            if (data.over_18) {
                msg.channel.send({ embed: errorNSFW });
            } else {
                const date = data.created_utc ? new Date(data.created_utc * 1000) : new Date();
                var link = postToImage(data);
                const ends = (ending) => link.endsWith(ending);
                if (!link || !allowedEndings.some(ends)) link = null;
                var selftext = '';
                if (data.selftext) {
                    selftext = data.selftext.split('\n')[0];
                    if (selftext.length > 150) {
                        selftext = selftext.substring(0, 150);
                    }
                }
                const embed = {
                    title: data.title ? data.title : 'Post has no title!',
                    url: data.url ? data.url : 'https://old.reddit.com',
                    dscription: selftext,
                    color: 16733952,
                    author: {
                        name: `/r/${data.subreddit ? data.subreddit : 'all'}`
                    },
                    timestamp: date.toISOString(),
                    image: {
                        url: link
                    }
                };
                msg.channel.send({ embed: embed });
            }
        } else {
            msg.channel.send('Hmm... you sure this is a subredit? I couldn\'t find a post.');
        }
    });
}