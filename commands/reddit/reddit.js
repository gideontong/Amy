const errorNSFW = {
    title: 'Error: NSFW?',
    description: 'I found a post, but it was marked as NSFW. Amy doesn\'t support NSFW Reddit posts at the moment. If the subreddit is not NSFW, you can try again.',
    color: 16711680,
    footer: {
        text: 'This post was brought to you by the anti-horny gang.'
    }
};
const blockedNSFW = {
    title: "Hold up!",
    description: "It is a universally agreed upon fact that it is not the right time to be horny. The post you requested was NSFW, but the police department has caught it just in the nick of time. No more requesting such posts!",
    color: 16711680,
    author: {
        name: "Amy Police Department",
        icon_url: "https://emoji.gg/assets/emoji/6597_blobpoliceangery.png"
    },
    thumbnail: {
        url: "https://emoji.gg/assets/emoji/6066_Ping_Hammer.gif"
    }
};
const allowedEndings = ['.png', '.jpg', '.gif', '.jpeg'];

const { blockNSFW } = require('../../config/config.json').probabilities;
const { getRandomPost, postToImage } = require('../../lib/Reddit');

/**
 * Get a command
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    if (args.length != 2) {
        msg.channel.send('You need to provide me a subreddit to find a random post from!');
        return;
    }
    const subreddit = encodeURIComponent(args[1]);
    getRandomPost(subreddit, function (data) {
        if (data) {
            if (data.over_18) {
                if (channel.nsfw) {
                    if (Math.random() < blockNSFW) {
                        return channel.send({ embed: blockedNSFW });
                    } else {
                        const embed = generatePost(data);
                        return channel.send({ embed: embed });
                    }
                } else {
                    return channel.send({ embed: errorNSFW });
                }
            } else {
                const embed = generatePost(data);
                return channel.send({ embed: embed });
            }
        } else {
            return channel.send('Hmm... you sure this is a subredit? I couldn\'t find a post.');
        }
    });
}

function generatePost(data) {
    const date = data.created_utc ? new Date(data.created_utc * 1000) : new Date();
    var link = postToImage(data);
    const ends = (ending) => link.endsWith(ending);
    if (!link || !allowedEndings.some(ends)) link = null;
    var selftext = '';
    if (data.selftext) {
        selftext = data.selftext.split('\n')[0];
        if (selftext.length > 150) {
            selftext = selftext.substring(0, 150) + '...';
        }
    }
    const embed = {
        title: data.title ? data.title : 'Post has no title!',
        url: data.url ? data.url : 'https://old.reddit.com',
        description: selftext,
        color: 16733952,
        author: {
            name: `/r/${data.subreddit ? data.subreddit : 'all'}`
        },
        timestamp: date.toISOString(),
        image: {
            url: link
        }
    };
    return embed;
}