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
     * @param {String[]|String} subreddits Subreddits to search
     * @callback success Success function on call
     */
    static getRandomPost(subreddits, success) {
        try {
            var subreddit;
            if (typeof (subreddits) == 'string') {
                subreddit = subreddits;
            } else if (Array.isArray(subreddits)) {
                subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
            } else {
                if (success) success(false);
                console.error(`Reddit.getRandomPost was passed invalid subreddit: ${typeof (subreddits)}`);
                return;
            }
            const endpoint = `/r/${subreddit}/random.json`;
            authenticatedGet(function (data) {
                if (success && data) success(data);
            }, host, endpoint, {}, {
                'User-Agent': userAgent
            });
        } catch (err) {
            console.error(`Reddit.getRandomPost has error: ${err}`);
        }
    }

    /**
     * Get a random Reddit image from an array of subreddits
     * and will take up to 5 tries before erroring out
     * @callback success Success function to call
     * @param {String[]|String} subreddits Array of subreddits
     * @param {int} attempts Number of attempts
     */
    static getRandomImage(success, subreddits, attempts = 3) {
        try {
            if (attempts > 5) {
                if (success) success('Error: something strange happened! Please report the bug with this command immediately.');
                console.error(`Reddit.getRandomImage failed after ${attempts} attempts with subreddits: ${subreddits}`);
                return;
            }
            Reddit.getRandomPost(subreddits, function (data) {
                try {
                    // TODO: handle special domains and check generic links are valid images
                    // const domain = data.data.children[0].data.domain;
                    const link = data[0].data.children[0].data.url_overridden_by_dest;
                    if (!link) return Reddit.getRandomImage(success, subreddits, ++attempts);
                    success(link);
                } catch (err) {
                    Reddit.getRandomImage(success, subreddits, ++attempts);
                }
            });
        } catch (err) {
            console.error(`Error: Reddit.getRandomImage failed with error: ${err}`);
        }
    }
}

module.exports = Reddit;