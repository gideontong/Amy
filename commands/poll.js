const examples = {
    quick: [
        "Do you believe in ghosts?",
        "Have you ever seen a UFO?",
        "Have you ever crushed on someone?",
        "Have you ever been dumped?",
        "Would you try bathing with all your clothes on?",
        "If you had a twin, would you be identical?",
        "Do you think anyone saw you steal that laptop?",
        "Are dopplegangers allowed to eat?"
    ],
    game: [
        "PlayerUnknown's Battlegrounds",
        "Minecraft",
        "Fortnite",
        "League of Legends",
        "MapleStory",
        "Roblox",
        "Grant Theft Auto V",
        "VALORANT"
    ]
}

// Dependencies
const log = require('log4js').getLogger('amy');
const { createQuickPoll, createGamePoll } = require('../lib/Survey');

// poll quick [question]
// poll game [times] [questions]

// Handler for poll command
module.exports = async (bot, msg, args) => {
    let multipleChoiceKeywords = [
        "mc",
        "multiplechoice",
        "choice",
        "choose"
    ];
    if (args.length < 2) {
        msg.channel.send('Polls wizard feature coming soon! Start a poll with `!poll quick` or `!poll game`, or get examples with `!poll examples`');
    } else {
        if (args[1] == 'quick') {
            if (args.length < 3) {
                msg.reply('Quick polls are a fast way to make a yes/no poll! Simply type `!poll quick [question]` or `!poll exampels quick` for examples.');
                return;
            }
            let question = msg.content.substring(args[0].length + args[1].length + 2);
            [success, id] = createQuickPoll(bot, msg.channel, question);
            if (success) {
                log.info(`${msg.author.tag} ${msg.author} started a quick poll at ${id} asking ${question}`);
            } else {
                log.error(`${msg.author.tag} ${msg.author} tried to start a quick poll but got ${id}`);
            }
        } else if (args[1] == 'game') {
            if (args.length < 4) {
                msg.reply('Game polls are a great way to see if anyone wants to play a game! Try `!poll game [times] [game]` or `!poll examples game` for examples.');
                return;
            }
            let game = msg.content.substring(args[0].length + args[1].length + 2);
            [success, id] = createGamePoll(bot, msg.channel, game, ['8:00 PM', '9:00 PM']);
            if (success) {
                log.info(`${msg.author.tag} ${msg.author} started a game poll with game ${question}`);
            } else {
                log.error(`${msg.author.tag} ${msg.author} tried to start a game poll but got ${id}`);
            }
        } else if (args[1].startsWith('example')) {
            if (args.length > 2) {
                if (args[2] == 'quick') createExamples(msg.channel, quick = true);
                else if (args[2] == 'game') createExamples(msg.channel, game = true);
                else if (multipleChoiceKeywords.includes(args[2])) createExamples(msg.channel, multipleChoice = true);
                else createExamples(msg.channel);
            } else createExamples(msg.channel);
        }
    }
}

function createExamples(channel, quick = false, game = false, multipleChoice = false) {
    if (!(quick && game && multipleChoice)) {
        quick = true, game = true, multipleChoice = true;
    }
}