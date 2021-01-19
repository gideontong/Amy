const errorNSFW = {
    title: 'Error: NSFW?',
    description: 'I found a post, but it was marked as NSFW. Amy doesn\'t support NSFW Reddit posts at the moment. If the subreddit is not NSFW, you can try again.',
    color: 16711680,
    footer: {
        text: 'This post was brought to you by the anti-horny gang.'
    }
};

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
    getRandomPost('', function (data) {
        if (data) {
            if (data.over_18) {
                msg.channel.send({ embed: errorNSFW });
            } else {
                const date = data.created_utc ? new Date(data.created_utc * 1000) : new Date();
                const image = postToImage(data);
                const embed = {
                    title: data.title ? data.title : 'Post has no title!',
                    url: data.url ? data.url : 'https://old.reddit.com',
                    color: 16733952,
                    author: {
                        name: `/r/${data.subreddit ? data.subreddit : 'all'}`
                    },
                    timestamp: date.toISOString(),
                    image: {
                        url: image ? image : null
                    }
                }
            }
        } else {
            msg.channel.send('Hmm... you sure this is a subredit? I couldn\'t find a post.');
        }
    });
}