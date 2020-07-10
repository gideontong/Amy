// Dependencies
const log = require('log4js').getLogger('amy');
const { createQuickPoll, createGamePoll } = require('../lib/Survey');

// Handler for poll command
module.exports = async (bot, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('Polls wizard feature coming soon!')
    } else {
        let question = msg.content.substring(args[0].length + args[1].length + 2);
        if (args[1] == 'quick') {
            [success, id] = createQuickPoll(bot, msg.channel, question);
            if (success) {
                log.info(`${msg.author.tag} ${msg.author} started a quick poll at ${id} asking ${question}`);
            } else {
                log.error(`${msg.author.tag} ${msg.author} tried to start a quick poll but got ${id}`);
            }
        } else if (args[1] == 'game') {
            [success, id] = createGamePoll(bot, msg.channel, question, ['8', '9']);
            if (success) {
                log.info(`${msg.author.tag} ${msg.author} started a game poll with game ${question}`);
            } else {
                log.error(`${msg.author.tag} ${msg.author} tried to start a game poll but got ${id}`);
            }
        }
    }
}