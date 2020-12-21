const { countAction } = require('../lib/Member');
const log = require('log4js').getLogger('amy');

module.exports = async (reaction, user) => {
    try {
        if (!user.bot) countAction(user.id, 'react');
    } catch (err) {
        log.error(`While trying to update database I got ${err}`);
    }
}