const host = 'www.ssn-check.org';
const endpoint = '/generate';

const { authenticatedPost } = require('../lib/Internet');

/**
 * Get a randomly generated SSN
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    authenticatedPost(function (data) {
        if (data && data['ssn']) {
            msg.channel.send(`Your fake ${data['state'] ? data['state'] : 'American'} SSN is: ${data['ssn']}`)
        }
    }, host, endpoint, {
        'state': '',
        'year': 0
    });
}