const host = 'www.reddit.com';
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)';

const { authenticatedGet } = require('./Internet');

/**
 * Reddit handler
 * @class
 */
class Reddit {
    /**
     * Converts JSON data to image link
     * @param {JSON} data JSON data
     * @returns {String} Image link
     */
    static postToImage(data) {
        if (data.is_self) {
            // TODO: Parse selfposts for embedded links
            return false;
        } else if (data.is_gallery) {
            try {
                const id = data.gallery_data.items[0].media_id;
                return `https://i.redd.it/${id}.jpg`;
            } catch (err) {
                console.warn(`Reddit.postToImage unable to extract gallery, check: ${data.permalink}`);
                return false;
            }
        } else if (data.url_overridden_by_dest) {
            return data.url_overridden_by_dest;
        } else {
            // Not sure what would end up here?
            console.warn(`Reached end of Reddit.postToImage logic, check: ${data.permalink}`);
            return false;
        }
    }

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
        const badDomains = [
            'youtube.com',
            'youtu.be'
        ];
        try {
            if (attempts > 5) {
                if (success) success('Error: something strange happened! Please report the bug with this command immediately.');
                console.error(`Reddit.getRandomImage failed after ${attempts} attempts with subreddits: ${subreddits}`);
                return;
            }
            Reddit.getRandomPost(subreddits, function (data) {
                try {
                    const domain = data.data.children[0].data.domain;
                    const link = Reddit.postToImage(data[0].data.children[0].data);
                    console.log(link);
                    if (!link || badDomains.includes(domain)) return Reddit.getRandomImage(success, subreddits, ++attempts);
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