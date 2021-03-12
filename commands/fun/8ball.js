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
    "As likely as <@578715287491182595> is gay.",
    "Maybe after <@578715287491182595> passes this CS class?",
    "Ask me after <@721503241531162707> gets married - *which might be never*.",
    "You'll know as soon as quarantine ends.",
    "Ask me when <@107890862679162880> and <@257613641698902016> get internships.",
    "As likely as <@132525049977503744> leaving the house is."
];

/**
 * 8-ball command that responds with a random message
 * @param {Message} msg Message to execute command on
 * @param {Array} args Arguments for the message
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const name = msg.member.nickname ? msg.member.nickname : msg.author.username;
    const question = msg.content.slice(args[0].length).trim();
    const answer = responses[Math.floor(Math.random() * responses.length)];
    const embed = {
        color: 1152865,
        fields: [
            {
                name: `${name} asked:`,
                value: question
            },
            {
                name: 'Answer:',
                value: answer
            }
        ]
    };
    channel.send({ embed: embed })
        .catch(err => { });
}