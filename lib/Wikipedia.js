const host = 'en.wikipedia.org';
const endpoint = '/w/api.php';

const { authenticatedGet } = require('./Internet');

/**
 * @class Wikipedia parser
 */
class Wikipedia {
    /**
     * Search Wikipedia
     * @param {String} query Query
     * @param {Number} limit Limit
     * @callback callback Success with array of page names
     */
    static search(callback, query, limit = 5) {
        if (query.length > 50) query = query.substring(0, 50);
        if (limit > 10) limit = 5;
        authenticatedGet(function (results) {
            if (results && results.query && results.query.pages) {
                const pages = Object.values(results.query.pages);
                const titles = Array.from(pages, item => item.title);
                callback(titles);
            } else {
                callback(new Array());
            }
        }, host, endpoint, {
            action: 'query',
            format: 'json',
            generator: 'search',
            gsrlimit: limit,
            gsrsearch: query
        });
    }
}

module.exports = Wikipedia;