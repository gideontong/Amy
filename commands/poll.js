// Dependencies
const log = require('log4js').getLogger('amy');
const { createQuickPoll } = require('../lib/Survey');

// Handler for poll command
module.exports = async (bot, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('Polls wizard feature coming soon!')
    } else if (args[1] == 'quick') {
        let question = msg.content.substring(args[0].length + args[1].length + 2);
        let(success, id) = createQuickPoll(bot, msg.channel, question);
        if (success) {
            log.info(`${msg.author.tag} ${msg.author} started a quick poll at ${id} asking ${question}`);
        } else {
            log.error(`${msg.author.tag} ${msag.author} tried to start a quick poll but got ${id}`);
        }
    }
}