const colors = 0xFFFFFF;
const msHours = 3600000;
const maxHours = 96;
const tutorial = {
    title: "Polling Tutorial",
    description: "Welcome to polling by Amy! It's currently in beta, so expect bugs, but here's what you can do:",
    color: 1223386,
    fields: [
        {
            name: "Yes/No Poll (1 hour)",
            value: "```${prefix}poll [Question]```"
        },
        {
            name: "Yes/No Poll (up to 3 days)",
            value: "```${prefix}poll [Hours] [Question]```"
        },
        {
            name: "Multiple Choice (1 hour, up to 10 options)",
            value: "```${prefix}poll multi [Question];[Answer];[Answer]```"
        },
        {
            name: "Multiple Choice (up to 3 days, 10 options)",
            value: "```${prefix}poll multi [Hours] [Question];[Answer];[Answer]```"
        }
    ]
};

const { emotes } = require('../../config/config.json');
const multiOptions = [
    '🌚', '🐦', '🍊', '😃', '🍀', '🐬', '🍇', '🌸', '🍚', '🎲'
];
const binaryOptions = [
    `<a:yes:${emotes.yes}>`, `<a:no:${emotes.no}>`, `<a:maybe:${emotes.maybe}>`
];
const binaryOptionsText = [
    'Yes', 'No', 'Maybe'
];

const { formatTime } = require('../../lib/Today');
const log = require('log4js').getLogger('amy');

/**
 * Create a poll for people to answer!
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    if (args.length < 2) {
        channel.send({ embed: tutorial });
        return;
    }
    if (isNaN(args[1])) {
        if (args[1].toLowerCase() == 'multi') {
            if (isNaN(args[2]) || args.length < 3) {
                // Multiple Choice (1 Hour)
                const optionsText = msg.content.substring(args[0].length + args[1].length + 2);
                processMultipleChoice(channel, msg.member, optionsText, 1);
                return;
            } else {
                // Multiple Choice
                const optionsText = msg.content.substring(args[0].length + args[1].length + args[2].length + 3);
                const hours = parseFloat(args[2]);
                if (checkForExpiry(channel, hours)) {
                    processMultipleChoice(channel, msg.member, optionsText, hours);
                    return;
                }
            }
        } else {
            // Yes/No (1 Hour)
            managePoll(channel, msg.member, args.slice(1).join(' '), 1, binaryOptions, binaryOptionsText);
            return;
        }
    } else {
        const hours = parseFloat(args[1]);
        if (checkForExpiry(channel, hours)) {
            if (args.length < 3) {
                channel.send('You need to provide a question to vote on!')
                return;
            } else {
                // Yes/No
                managePoll(channel, msg.member, args.slice(2).join(' '), hours, binaryOptions, binaryOptionsText);
                return;
            }
        }
    }
}

/**
 * Expiry check
 * @param {TextChannel} channel Channel to send poll
 * @param {Number} hours Hours length of poll
 */
function checkForExpiry(channel, hours) {
    if (hours < 0.01) {
        channel.send('Your poll has to expire in the future and take at least a minute! Try again?');
        return false;
    } else if (hours > maxHours) {
        channel.send(`Too long! You can only make polls up to ${maxHours} hours.`);
        return false;
    } else {
        return true;
    }
}

/**
 * Process multiple choice poll into question and answers
 * @param {TextChannel} channel Channel to send the poll in
 * @param {String} text Text of command
 */
function processMultipleChoice(channel, owner, text, hours) {
    var question;
    var options = text.split(';');
    if (text.length == 0) {
        channel.send('Something went wrong! It seems you do not have a question or any answer choices.');
        return;
    } else if (options.length < 1) {
        channel.send('You need to provide some answer options to your question!');
        return;
    } else {
        question = options[0];
        options = options.slice(1, options.length > multiOptions + 1 ? multiOptions.length + 1 : options.length);
        managePoll(channel, owner, question, hours, multiOptions.slice(0, options.length), options);
        return;
    }
}

/**
 * Manages a poll
 * @param {TextChannel} channel Channel to start the poll
 * @param {GuildMember} owner Owner of poll
 * @param {String} text Poll description
 * @param {Number} hours Hours to expiration
 * @param {String[]} emotes Emotes to use
 * @param {Number[]} answers String associated with emotes
 */
function managePoll(channel, owner, text, hours, emotes, answers) {
    if (emotes.length != answers.length) {
        const code = Math.floor(Math.random() * 100);
        log.error(`poll.managePoll has array size mismatch (code ${code}), emotes: ${emotes} and answers: ${answers}`);
        channel.send(`Something went wrong, please report error code ${code}`);
        return;
    }
    var options = new String();
    for (let i = 0; i < emotes.length; i++) {
        options += `${emotes[i]} ${answers[i]}\n`;
    }
    var end = new Date();
    end.setHours(end.getHours() + hours);
    const timeout = Math.floor(hours * msHours);
    var poll = {
        title: `${owner.nickname ? owner.nickname : owner.user.username} is starting a new poll!`,
        description: text,
        color: Math.floor(Math.random() * colors),
        fields: [
            {
                name: 'Options',
                value: options ? options : 'No options!',
                inline: true
            },
            {
                name: 'Vote Tallies',
                value: 'No one has voted yet!',
                inline: true
            }
        ],
        footer: {
            text: remainingTime(end)
        }
    };
    channel.send({ embed: poll })
        .then(pollMessage => {
            emotes.forEach(emote => {
                pollMessage.react(emote);
            });
            const filter = (reaction, user) => {
                return emotes.some(emoji => emoji == new String(reaction.emoji));
            };
            const collector = pollMessage.createReactionCollector(filter, { dispose: true, time: timeout });
            var counts = new Array(emotes.length).fill(0);
            collector.on('collect', function (reaction, user) {
                updateCounts(poll, pollMessage, counts, emotes, reaction, user, end);
            });
            collector.on('remove', function (reaction, user) {
                updateCounts(poll, pollMessage, counts, emotes, reaction, user, end, false);
            });
            collector.on('end', collected => {
                poll.title = `${owner.nickname ? owner.nickname : owner.user.username} previously ran a poll.`;
                poll.footer.text = 'This poll has expired, and is no longer taking responses.';
                pollMessage.edit({ embed: poll });
            });
        })
        .catch(err => {
            log.error(`Got error with polls: ${err}`);
        });
}

/**
 * Update the counts of the poll
 * @param {Object} poll Poll object
 * @param {Message} message Poll message
 * @param {Number[]} counts Counts of each reaction
 * @param {String[]} emotes Reaction emotes
 * @param {MessageReaction} reaction Reaction of item
 * @param {User} user User who intiated reaction
 * @param {Date} end Add the end date
 * @param {Boolean} add Add mode (otherwise, subtract mode)
 */
function updateCounts(poll, message, counts, emotes, reaction, user, end, add = true) {
    if (user.bot) return;
    const idx = emotes.indexOf(new String(reaction.emoji));
    log.info(`idx was ${idx}`);
    if (idx > 0) {
        counts[idx] += Number(add);
    }
    var tallies = new String();
    const sum = counts.reduce((acc, tot) => acc + tot);
    log.info(sum);
    for (let i = 0; i < emotes.length; i++) {
        let percentage = Math.round(100 * counts[i] / sum);
        tallies += `${emotes[i]} ${counts[i]} Votes (${percentage}%)\n`;
    }
    log.info(tallies);
    if (sum == 0) {
        poll.fields[1].value = 'No one has voted yet!';
    } else {
        poll.fields[1].value = tallies;
    }
    poll.footer.text = remainingTime(end);
    message.edit({ embed: poll });
}

/**
 * Calculate remaining time left as a string
 * @param {Date} end Ending time
 */
function remainingTime(end) {
    const difference = end - new Date();
    const formatted = formatTime(difference / 1000, true);
    return `This poll expires in ${formatted.trim()} or less.`;
}

/**
 * Get tallies string
 * @param {Number[]} answers Count of answers
 */
function getTallies(answers) {
    const sum = answers.reduce((acc, tot) => acc + tot);
    if (sum == 0) {
        return 'No one has voted yet!';
    }
    let percentage = new Array();
    answers.forEach(answer => {
        percentage.push(Math.round(100 * answer / sum));
    });
    let strings = [
        `<a:yes:${emotes.yes}> ${answers[0]} Votes (${percentage[0]}%)`,
        `<a:no:${emotes.no}> ${answers[1]} Votes (${percentage[1]}%)`,
        `<a:maybe:${emotes.maybe}> ${answers[2]} Votes (${percentage[2]}%)`
    ];
    return strings.join('\n');
}