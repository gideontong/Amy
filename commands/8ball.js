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

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for 8ball command
module.exports = async (bot, msg, args) => {
    await require('./loadingscreentips')(bot, msg, args);
    msg.channel.send(responses[Math.floor(Math.random() * responses.length)]);
    log.info(`${msg.author.tag} ${msg.author} requested an 8ball!`);
}