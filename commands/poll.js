// Dependencies
const log = require('log4js').getLogger('amy');
const { createQuickPoll, createGamePoll } = require('../lib/Survey');

// Handler for poll command
module.exports = async (bot, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('Polls wizard feature coming soon! Start a poll with `!poll quick` or `!poll game`')
    } else {
        if (args[1] == 'quick') {
            let question = msg.content.substring(args[0].length + args[1].length + 2);
            [success, id] = createQuickPoll(bot, msg.channel, question);
            if (success) {
                log.info(`${msg.author.tag} ${msg.author} started a quick poll at ${id} asking ${question}`);
            } else {
                log.error(`${msg.author.tag} ${msg.author} tried to start a quick poll but got ${id}`);
            }
        } else if (args[1] == 'game') {
            let question = msg.content.substring(args[0].length + args[1].length + 2);
            [success, id] = createGamePoll(bot, msg.channel, question, ['8:00 PM', '9:00 PM']);
            if (success) {
                log.info(`${msg.author.tag} ${msg.author} started a game poll with game ${question}`);
            } else {
                log.error(`${msg.author.tag} ${msg.author} tried to start a game poll but got ${id}`);
            }
        }
    }
}