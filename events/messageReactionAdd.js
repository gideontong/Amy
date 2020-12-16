// const { updateExistingPoll } = require('../lib/Survey');
const { countAction } = require('../lib/Member');
const log = require('log4js').getLogger('amy');

module.exports = async (reaction, user) => {
    // let run = reaction.me && reaction.message.editable && !user.bot;
    // if (run) {
    //     updateExistingPoll(reaction);
    // }
    try {
        countAction(user.id, 'react');
    } catch (err) {
        log.error(`While trying to update database I got ${err}`);
    }
}