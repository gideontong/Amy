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
    ],
    multipleChoice: [
        "Russia,Brazil,Indonesia,America;Which country has the lowest number of internet users?",
        "No,No,Probably Not;Do you like fruitcake?",
        "Yes,Definitely,Sure,Why Not?;Would you buy a game the Dudes of 708 made?",
        "Krebs,Calvin,Glycosis,ETC,Cyboxlic Acid Cycle;Which are stages of cell respiration?",
        "$5,$10,$20;How much money would you like to donate?"
    ]
}

// Dependencies
const log = require('log4js').getLogger('amy');
const { createQuickPoll, createGamePoll, createMultipleChoicePoll } = require('../lib/Survey');
const { selectN } = require('../lib/Poisson');

// poll quick [question]
// poll game [times,] [game]
// poll mc [options,];[question]

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
        args[1] = args[1].toLowerCase();
        if (args[1] == 'quick') {
            if (args.length < 3) {
                msg.reply('Quick polls are a fast way to make a yes/no poll! Simply type `!poll quick [question]` or `!poll exampels quick` for examples.');
                return;
            }
            let question = msg.content.substring(args[0].length + args[1].length + 2);
            [success, id] = createQuickPoll(bot, msg.channel, question);
            if (success) {
                log.info(`${msg.author.tag} ${msg.author} started a quick poll at ${id} in ${msg.channel}`);
            } else {
                log.error(`${msg.author.tag} ${msg.author} tried to start a quick poll but got ${id}`);
            }
        } else if (args[1] == 'game') {
            if (args.length < 4) {
                msg.reply('Game polls are a great way to see if anyone wants to play a game! Try `!poll game [times] [game]` or `!poll examples game` for examples.');
                return;
            }
            let game = msg.content.substring(args[0].length + args[1].length + args[2].length + 3);
            [success, id] = createGamePoll(bot, msg.channel, game, args[2].split(','));
            if (success) {
                log.info(`${msg.author.tag} ${msg.author} started a game poll in ${msg.channel}`);
            } else {
                msg.channel.send(`I tried to make your poll, but got an error! Try again?`);
                log.error(`${msg.author.tag} ${msg.author} tried to start a game poll but got ${id}`);
            }
        } else if (multipleChoiceKeywords.includes(args[1])) {
            let content = msg.content.substring(args[0].length + 1);
            content = content.split(";");
            if (content.length != 2) {
                msg.channel.send("Your poll should only contain one `;`, as it is a separator!");
                return;
            }
            let options = content[0].split(",");
            [success, id] = createMultipleChoicePoll(channel, content[1], options);
            if (success) {
                log.info(`${msg.author.tag} ${msg.author} started a multiple choice poll in ${msg.channel}`);
            } else {
                msg.channel.send(`I tried to make your poll, but here's what I got: ${id}`);
                log.error(`${msg.author.tag} ${msg.author} tried to start a multiple choice poll but got ${id}`);
            }
        } else if (args[1].startsWith('example')) {
            if (args.length > 2) {
                if (args[2] == 'quick') createExamples(msg.channel, true);
                else if (args[2] == 'game') createExamples(msg.channel, false, true);
                else if (multipleChoiceKeywords.includes(args[2])) createExamples(msg.channel, false, false, true);
                else createExamples(msg.channel);
            } else createExamples(msg.channel);
            log.info(`${msg.author.tag} ${msg.author} requested polling examples`);
        }
    }
}

// Each default value is whether or not they will be displayed on the help page
function createExamples(channel, quick = false, game = false, multipleChoice = false) {
    let catdance = "<a:catdance:729440916128923649>";
    let example = {
        "content": "<a:ditto:729440915835322379> So you want some **polling** examples! <a:ditto:729440915835322379>",
        "embed": {
            "title": "We can make cool polls, yes.",
            "description": "Here are some examples.",
            "color": 16236854,
            "fields": [],
            "footer": {
                "text": "!help always calls the help command."
            }
        }
    };
    let n = 2;
    if (!(quick || game || multipleChoice)) {
        let noneType = {
            "content": "I can make lots of different kinds of polls!",
            "embed": {
                "title": "What kind of poll are you looking for?",
                "description": "Type `!poll examples quick` to see quick polls.\nType `!poll examples game` to see game polls.\nType `!poll examples mc` to see multiple choice polls.",
                "color": 16236854,
                "footer": {
                    "text": "!help always calls the help command."
                }
            }
        }
        channel.send(noneType);
    } else {
        if (quick) {
            let quickInfo = {
                "name": "Quick Polls",
                "value": "You can make quick polls to ask your friends yes/no questions.\n\nTry asking your friends questions with commands like:\n"
            };
            let quickExamples = selectN(examples.quick, n);
            for (var i = 0; i < quickExamples.length; i++) {
                quickInfo.value += catdance + " `!poll quick " + quickExamples[i] + "`\n";
            }
            example.embed.fields.push(quickInfo);
        }
        if (game) {
            let gameInfo = {
                "name": "Game Polls",
                "value": "You can make game polls to see if anyone's down to play a game.\n\nTry making or with commands like:\n"
            };
            let timeInfo = {
                "name": "Formatting Time",
                "value": "Separate the times you want with commas, and no spaces in between. If you put spaces, Amy will try to figure out what you meant, but she isn't *that* smart yet.\n\n<a:catdance:729440916128923649> `3,4,5` means **3 PM, 4 PM, 5 PM**\n<a:catdance:729440916128923649> `3h,4h,5h` means **in 3 hours, in 4 hours, in 5 hours**. You can also use `m` or `d` for months or days. *It'll automatically be converted into an approximate date and time.*\n<a:catdance:729440916128923649> `3:30,4:30,5:30` means **3:30 PM, 4:30 PM, 5:30 PM**\n\nYou're  also allowed to mix and match, so `3,4:15,8h` is **3 PM, 4:15 PM, in 8 hours**."
            };
            let gameExamples = selectN(examples.game, n);
            for (var i = 0; i < gameExamples.length; i++) {
                gameInfo.value += catdance + " `!poll game [times] " + gameExamples[i] + "`\n";
            }
            example.embed.fields.push(gameInfo);
            example.embed.fields.push(timeInfo);
        }
        if (multipleChoice) {
            let mcInfo = {
                "name": "Multiple Choice Polls",
                "value": "You can make multiple choice polls for additional flexibility. List your options, then a semicolon, then the question, like so:\n\n"
            };
            let mcExamples = selectN(examples.multipleChoice, n);
            for (var i = 0; i < mcExamples.length; i++) {
                mcInfo.value += catdance + " `!poll mc " + mcExamples[i] + "`\n";
            }
            example.embed.fields.push(mcInfo);
        }
        channel.send(example);
    }
}