const { updateExistingPoll } = require('../lib/Survey');

module.exports = async (reaction, user) => {
    let run = reaction.me && reaction.message.editable && !user.bot;
    if (run) {
        updateExistingPoll(reaction);
    }
}