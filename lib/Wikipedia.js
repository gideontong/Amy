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

    /**
     * Returns text of Wikipedia page
     * @param {String} name Name of Wikipedia page
     */
    static getPage(callback, name, sentences = 5) {
        authenticatedGet(function (page) {
            if (page && page.query && page.query.pages) {
                callback(page.query.pages[0].title, page.query.pages[0].extract);
            } else {
                callback(new String(), new String());
            }
        }, host, endpoint, {
            action: 'query',
            format: 'json',
            prop: 'extracts',
            exsentences: sentences,
            exlimit: 1,
            titles: name,
            explaintext: 1,
            formatversion: 2
        });
    }

    /**
     * Return the first page from a search, or blank if none
     * @param {String} query Search function
     * @callback callback Result string
     */
    static pageSearch(callback, query) {
        Wikipedia.search(function (results) {
            if (results.length != 0) {
                Wikipedia.getPage(callback, results[0]);
            } else {
                callback(new String());
            }
        }, query, 1);
    }
}

module.exports = Wikipedia;