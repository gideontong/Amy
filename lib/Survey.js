const { emoji } = require('../config/config.json');
const defaultColor = 10873618;

class Survey {
    static createQuickPoll(bot, channel, question, color = defaultColor) {
        try {
            let embed = {
                "content": "Hey! Kids it's time to answer a survey!",
                "embed": {
                    "title": "Survey Time!",
                    "color": color,
                    "fields": [
                        {
                            "name": "What you're voting on:",
                            "value": question + '\n'
                        },
                        {
                            "name": "How to vote:",
                            "value": `React with <a:yes:${emoji.yes}> for yes, and <a:no:${emoji.no}> for no!\n`
                        },
                        {
                            "name": "Results:",
                            "value": `Currently, no one has voted!`
                        }
                    ],
                    "footer": {
                        "text": "Polls ID: Loading..."
                    }
                }
            };
            let id = 0;
            channel.send(embed)
                .then((message) => {
                    message.react(bot.emojis.resolve(emoji.yes));
                    message.react(bot.emojis.resolve(emoji.no));
                    id = message.id;
                });
            return (true, id);
        } catch (err) {
            return (false, err);
        }
    }

    static createMultipleChoicePoll(question, choices, color = defaultColor) {
    }

    static createGamePoll(question, game, times, color = defaultColor) {
    }

    static updateExistingPoll(message, emoji) {
    }

    static closePoll(message) {
    }
}

module.exports = Survey;