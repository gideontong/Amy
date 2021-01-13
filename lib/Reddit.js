const host = 'www.reddit.com';
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)';

const { authenticatedGet } = require('./Internet');

/**
 * Reddit handler
 * @class
 */
class Reddit {
    /**
     * Get a random post given a subreddit or array of subreddits
     * @callback success Success function on call
     * @param {String[]|String} subreddits Subreddits to search
     */
    static getRandomPost(success, subreddits) {
        try {
            var subreddit;
            if (typpeof(subreddits) == 'string') {
                subreddit = subreddits;
            } else if (Array.isArray(subreddits)) {
                subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
            } else {
                if (success) success(false);
                console.error(`Reddit.getRandomPost was passed invalid subreddit: ${typeof (subreddits)}`);
                return;
            }
            authenticatedGet(function (data) {
                if (success && data) success(data);
            }, host, endpoint, {}, {
                'User-Agent': userAgent
            });
        } catch (err) {
            console.error(`Reddit.getRandomPost has error: ${err}`);
        }
    }

    // TODO: This code needs refactoring!
    /**
     * Get a random Reddit image from an array of subreddits
     * and will take up to 5 tries before erroring out
     * @param {function} success Success function to call
     * @param {Array} subreddits Array of subreddits
     * @param {int} attempts Number of attempts
     */
    static getRedditImage(success, subreddits, attempts = 0) {
        try {
            if (attempts > 5) {
                if (success) success('Error: failed too many times trying to get an image!');
                console.error('Failed trying to get an image.');
                return;
            }
            const host = 'www.reddit.com';
            var subreddit;
            if (typeof (subreddits) == 'string') {
                subreddit = subreddits;
            } else if (Array.isArray(subreddits)) {
                subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
            } else {
                if (success) success('Something went wrong! Try again?');
                console.error(`Something went REALLY wrong... what is this? ${subreddits}`);
                return;
            }
            const endpoint = `/r/${subreddit}/random.json`;
            authenticatedGet(function (data) {
                if (data
                    && data.length > 0) {
                    if (data[0]) data = data[0];
                    if (data.data
                        && data.data.children
                        && data.data.children.length > 0
                        && data.data.children[0].data
                        && data.data.children[0].data.url_overridden_by_dest) {
                        const link = data.data.children[0].data.url_overridden_by_dest;
                        if (link.startsWith('https://i')) {
                            success(link);
                        } else {
                            success(`This link isn't supported yet, but you can view it in the browser: ${link}`);
                        }
                        return;
                    } else {
                        console.warn('Going down the rabbit hole of Reddit images');
                        Reddit.getRedditImage(success, subreddits, ++attempts);
                        return;
                    }
                } else {
                    console.warn('Going down the rabbit hole of Reddit images');
                    Reddit.getRedditImage(success, subreddits, ++attempts);
                    return;
                }
            }, host, endpoint, {}, {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
            });
        } catch (err) {
            console.error(`Error: trying to get image, got ${err}`);
        }
    }
}

module.exports = Reddit;