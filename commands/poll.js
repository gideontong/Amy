const reacts = {
    "yes": "729594115989176332",
    "no": "729594117017042964"
}

// Dependencies
const log = require('log4js').getLogger('amy');

// Handler for poll command
module.exports = async (bot, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('Polls wizard feature coming soon!')
    } else if (args[1] == 'quick') {
        let question = msg.content.substring(args[0].length + args[1].length + 2);
        let embed = {
            "content": "Hey! Kids it's time to answer a survey!",
            "embed": {
                "title": "Survey Time!",
                "description": `**${question}**\n\nReact with <a:yes:${reacts.yes}> for yes, and <a:no:${reacts.no}> for no!\n\nCurrently we are leaning towards <a:yes:${reacts.yes}> **yes** with a [coming soon]% vote.`,
                "color": 10873618,
                "fields": [
                    {
                        "name": "Question",
                        "value": question
                    }
                ],
                "footer": {
                    "text": "id: test"
                }
            }
        };
        msg.channel.send(embed)
            .then((message) => {
                message.react(bot.emojis.resolve(reacts.yes));
                message.react(bot.emojis.resolve(reacts.no));
            });
    }
}