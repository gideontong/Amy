const host = 'opentdb.com';
const endpoint = '/api.php';
const timeout = 15;
const colors = [
    0xC17E9B,
    0xCDAB81,
    0xD8D7B9,
    0x87B191,
    0x7397AA,
    0x6E6B9F
];
const genericFailure = {
    title: "Didn't pick an option in time!",
    description: 'You failed to pick an option in time. Run the `trivia` command again?',
    color: 0xFF0033,
    footer: {
        text: 'Fun fact: I know thousands of trivia questions.'
    }
};

const { authenticatedGet } = require('../lib/Internet');
const { shuffle } = require('../lib/MagicNumbers');
const log = require('log4js').getLogger('amy');

/**
 * Play a trivia game singleplayer or multiplayer!
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    let color = 0;
    var menu = {
        title: "Welcome to Amy's Trivia Game!",
        description: "This game supports both singleplayer and multiplayer. The more people that play, the bigger the prize pool. Compete to win large prizes!\n\nDo you want to play __singleplayer__ or __multiplayer__?\n:bust_in_silhouette: Singleplayer\n:busts_in_silhouette: Multiplayer",
        color: colors[color % colors.length],
        footer: {
            text: `You have ${timeout} seconds to answer.`
        }
    };
    msg.channel.send({ embed: menu })
        .then(mainMenu => {
            color++;
            const filter = (reaction, user) => {
                return ['👤', '👥'].includes(reaction.emoji.name) && user.id == msg.author.id;
            }
            mainMenu.react('👤');
            mainMenu.react('👥');
            mainMenu.awaitReactions(filter, { max: 1, time: timeout * 1000, errors: ['time'] })
                .then(collected => {
                    const multiplayer = collected.first().emoji.name == '👥';
                    menu.color = colors[color % colors.length];
                    menu.footer = {
                        text: `You have selected ${multiplayer ? 'multiplayer' : 'singleplayer'} and this menu is no longer active.`
                    };
                    color++;
                    mainMenu.edit({ embed: menu });
                    play(msg.author, msg.channel, color, multiplayer);
                    return;
                })
                .catch(collected => {
                    const failure = {
                        title: 'Failed to Start Trivia Game',
                        description: `You didn't respond fast enough to the menu selection.`,
                        color: colors[color % colors.length],
                        footer: {
                            text: 'Run the trivia command again to play!'
                        }
                    };
                    mainMenu.edit({ embed: failure });
                    log.warn("Couldn't start trivia game due to timeout");
                    return;
                });
        })
        .catch(err => { });
}

/**
 * Main game runtime
 * @param {User} starter User who started the game
 * @param {TextChannel} channel Channel to play the game in
 * @param {Number} color Current color the value is on.
 * @param {Boolean} multiplayer Whether or not to play the game in multiplayer
 */
function play(starter, channel, color = 0, multiplayer = false) {
    let questionEmbed = {
        title: 'How many questions of trivia?',
        description: `How many questions of trivia do you want to play? You ${multiplayer ? 'and your friends ' : ''}will be given ${timeout} seconds per question.\n\n🤠 3 Questions\n🥳 5 Questions\n🤓 7 Questions\n🤯 10 Questions`,
        color: colors[color % colors.length],
        footer: {
            text: `You have ${timeout} seconds to choose.`
        }
    };
    color++;
    channel.send({ embed: questionEmbed })
        .then(questionMenu => {
            const questionOptions = {
                '🤠': 3,
                '🥳': 5,
                '🤓': 7,
                '🤯': 10
            };
            const filter = (reaction, user) => {
                return Object.keys(questionOptions).includes(reaction.emoji.name) && user.id == starter.id;
            }
            Object.keys(questionOptions).forEach(emoji => {
                questionMenu.react(emoji);
            });
            questionMenu.awaitReactions(filter, { max: 1, time: timeout * 1000, errors: ['time'] })
                .then(collected => {
                    const questions = questionOptions[collected.first().emoji.name];
                    questionEmbed.footer = {
                        text: `You have selected ${questions} questions.`
                    };
                    questionMenu.edit({ embed: questionEmbed });
                    doQuestions(channel, ++color, questions, multiplayer, function (points) {
                        if (multiplayer) {
                            let description = '__Wins__\n\n';
                            Object.entries(([userID, points]) => {
                                description += `<@${userID}>: ${points} points\n`;
                            });
                            const wins = {
                                title: 'Answers Correct',
                                description: description
                            }
                            channel.send({ embed: wins });
                        } else {
                            const win = {
                                title: 'Answers Correct',
                                description: points
                            };
                            channel.send({ embed: win });
                        }
                    }, starter);
                })
                .catch(collected => {
                    questionMenu.edit({ embed: genericFailure });
                    log.warn("Couldn't start trivia game due to timeout");
                    return;
                });
        })
        .catch(err => { });
}

/**
 * Main question generation and play loop
 * @param {TextChannel} channel Channel to play the trivia game
 * @param {Number} color Color index to set the embed
 * @param {Number} questions Number of questions to get
 * @param {Boolean} multiplayer Whether or not to play in multiplayer
 * @param {function} update Where to send the game results
 * @param {User} player Player data for singleplayer mode
 */
function doQuestions(channel, color, questions, multiplayer, update, player) {
    log.info('Beginning question loop');
    if (!(player || multiplayer)) {
        log.error('trivia.doQuestions is missing player in singleplayer mode');
        return;
    }
    authenticatedGet(function (questionData) {
        if (questionData.response_code != 0) {
            log.error(`While trying to get trivia questions I got: ${questionData}`);
            const error = {
                title: 'Error Getting Trivia Questions',
                description: 'There is a possibility that the trivia server is currently down. Please wait a few minutes. If the problem persists, please contact Gideon for more support.',
                color: colors[color & colors.length],
                timestamp: new Date().toISOString()
            };
            channel.send({ embed: error });
            return;
        }
        let index = 0;
        let scores = multiplayer ? {} : 0;
        function doNextQuestion(answers) {
            if (answers) {
                if (multiplayer) {
                    answers.forEach(user => {
                        if (scores[user]) scores[user]++;
                        else scores[user] = 1;
                    })
                } else {
                    scores++;
                }
            }
            if (index >= questions) {
                update(scores);
                return;
            }
            const singleQuestionData = questionData.results[index];
            releaseQuestion(channel, color++, singleQuestionData, multiplayer, doNextQuestion, player);
            index++;
        }
        if (index == 0) {
            doNextQuestion();
        }
    }, host, endpoint, {
        amount: questions,
        encode: 'url3986'
    });
}

/**
 * Release a question into a text channel
 * @param {TextChannel} channel Channel to send the question in
 * @param {Number} color Color index to set the embed
 * @param {Object} question Question data
 * @param {Boolean} multiplayer Whether or not to play in multiplayer
 * @param {function} update Where to send the question results
 * @param {User} player Player data for singleplayer mode
 */
function releaseQuestion(channel, color, question, multiplayer, update, player) {
    if (!(player || multiplayer)) {
        log.error('trivia.releaseQuestion is missing player in singleplayer mode');
        return;
    }
    let answers = ['True', 'False'];
    const isMultiple = question.type == 'multiple';
    const emojis = isMultiple ? ['📀', '📌', '🔑', '🛡️'] : ['🟢', '🔴'];
    let answer = '🟢';
    if (isMultiple) {
        answers = question.incorrect_answers;
        answers.push(question.correct_answer);
        answers = shuffle(answers);
        answer = emojis[answers.indexOf(question.correct_answer)];
    }
    for (let i = 0; i < answers.length; i++) {
        answers[i] = `${emojis[i]} ${decodeURIComponent(answers[i])}`;
    }
    const parts = [
        `${decodeURIComponent(question.question)}\n`,
        '__Answer Choices__'
    ].concat(answers);
    let embed = {
        title: `${isMultiple ? 'Multiple Choice' : 'True/False'} Trivia Question`,
        description: parts.join('\n'),
        color: colors[color % color.length],
        footer: {
            text: `Category: ${decodeURIComponent(question.category)}`
        }
    };
    channel.send({ embed: embed })
        .then(questionBox => {
            emojis.forEach(emoji => {
                questionBox.react(emoji);
            });
            const filter = (reaction, user) => {
                return emojis.includes(reaction.emoji.name) && (multiplayer ? !user.bot : user.id == player.id);
            }
            if (multiplayer) {
                const collector = questionBox.createReactionCollector(filter, { time: timeout * 1000 });
                let answerMap = {};
                collector.on('collect', (reaction, user) => {
                    answerMap[user.id] = reaction.emoji.name == answer;
                });
                collector.on('remove', (reaction, user) => {
                    if (answerMap[user.id] && reaction.emoji.name == answer) {
                        delete answerMap[user.id];
                    }
                });
                collector.on('end', collected => {
                    let correct = [];
                    Object.entries(answerMap).forEach(([user, userAnswer]) => {
                        if (userAnswer) {
                            correct.push(user);
                        }
                    });
                    update(correct);
                    return;
                });
            } else {
                questionBox.awaitReactions(filter, { max : 1, time: timeout * 1000, errors: ['time'] })
                    .then(collected => {
                        if (answer == collected.first().emoji.name) {
                            embed.description = 'You answered correctly!';
                            questionBox.edit({ embed: embed });
                            update(true);
                        } else {
                            embed.description = 'You answered incorrectly!'
                            questionBox.edit({ embed: embed });
                            update(false);
                        }
                        return;
                    })
                    .catch(collected => {
                        embed.description = 'You failed to answer in time! Moving on to the next question.';
                        questionBox.edit({ embed: embed });
                        update(false);
                        return;
                    });
            }
        })
        .catch(err => { });
}