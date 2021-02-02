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
        } else {
        }
    }, query);
}