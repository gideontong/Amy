const responses = [
    "As I see it, yes.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "It is certain.",
    "It is decidely so.",
    "Most likely.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Outlook good.",
    "Reply hazy, try again.",
    "Signs point to yes.",
    "Very doubtful.",
    "Without a doubt.",
    "Yes.",
    "Yes - definitely!",
    "You may rely on it.",
    "As likely as Leo is gay.",
    "Maybe after Leo passes this CS class?",
    "Ask me after Amy gets married - *which might be never*.",
    "You'll know as soon as quarantine ends."
]

// Imports from local config files
const tips = require('../config/loading.json').messages;

// Imports from dependencies
const log = require('log4js').getLogger('amy');
const { selectN } = require('../lib/Today');

// Handler for 8ball command
module.exports = async (bot, msg, args) => {
    const messages = selectN(tips, 3);
    msg.channel.send(`Loading...`)
        .then(msg => {
            for (var i = 0; i < messages.length; i++) {
                writeMessage(msg, messages[i], (i + 1) * 2000);
            }
            setTimeout(() => {
                let response = responses[Math.floor(Math.random() * responses.length)];
                msg.edit(`> ${msg.content.substring(args[0].length + 1)}\n${response}`);
            }, (messages.length + 1) * 2000, msg, responses);
        });
    log.info(`${msg.author.tag} ${msg.author} requested an 8ball!`);
}

function writeMessage(msg, text, timeout) {
    setTimeout(() => {
        msg.edit(`> ${text}\nLoading...`);
    }, timeout, text)
}