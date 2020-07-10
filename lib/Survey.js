const defaultColor = 10873618;
const mcChoices = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '0️⃣'];

const { emoji } = require('../config/config.json');

class Survey {
    static createQuickPoll(bot, channel, question, mentions = "Kids", color = defaultColor) {
        try {
            let embed = {
                "content": `Hey! ${mentions} it's time to answer a survey!`,
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
                        "text": "Polls ID: quick.loading..."
                    }
                }
            };
            var id = 0;
            channel.send(embed)
                .then((message) => {
                    message.react(bot.emojis.resolve(emoji.yes));
                    message.react(bot.emojis.resolve(emoji.no));
                    id = message.id;
                });
            return [true, id];
        } catch (err) {
            return [false, err];
        }
    }

    static createMultipleChoicePoll(question, choices, mentions = "Kids", color = defaultColor) {
    }

    static createGamePoll(bot, channel, game, options, boxart = "", mentions = "Kids", color = defaultColor) {
        try {
            if (options.length < 1) throw "Needs at least one option!";
            if (options.length > 10) throw "Can't have more than 10 options!";
            var emojiString = "", optionsString = "";
            for (var i = 0; i < options.length; i++) {
                emojiString += mcChoices[i] + '\n';
                optionsString += options[i] + '\n';
            }
            let embed = {
                "content": `Hey! ${mentions} it's time to answer a survey!`,
                "embed": {
                    "title": "Game Time",
                    "description": `You guys down to play **${game}** today?`,
                    "color": 10873618,
                    "fields": [
                        {
                            "name": "How to vote:",
                            "value": `React with <a:yes:${emoji.yes}> for yes, and <a:no:${emoji.no}> for no!\n`
                        },
                        {
                            "name": "__Selection__",
                            "value": emojiString,
                            "inline": true
                        },
                        {
                            "name": "Also, when do you want to start?",
                            "value": optionsString,
                            "inline": true
                        },
                        {
                            "name": "Results",
                            "value": "Currently, no one has voted!"
                        }
                    ],
                    "thumbnail": {
                        "url": boxart
                    }
                }
            };
            var id = 0;
            channel.send(embed)
                .then((message) => {
                    message.react(bot.emojis.resolve(emoji.yes));
                    message.react(bot.emojis.resolve(emoji.no));
                    for (var i = 0; i < options.length; i++) {
                        message.react(mcChoices[i]);
                    }
                    id = message.id;
                });
            return [true, id];
        } catch (err) {
            return [false, err];
        }
    }

    static addPollId(message, id) {
    }

    static updateExistingPoll(reaction) {
        let embed = reaction.message.embeds[0].toJSON();
        let yesEmoji = reaction.message.reactions.cache.get(emoji.yes);
        let noEmoji = reaction.message.reactions.cache.get(emoji.no);
        let yes = yesEmoji ? yesEmoji.count - 1 : 0;
        let no = noEmoji ? noEmoji.count - 1 : 0;
        let percentage = Math.round((yes / (yes + no)) * 100);
        let nextString = embed.fields[2].value;
        if (yes > no) {
            nextString = `Currently we are leaning towards <a:yes:${emoji.yes}> **yes** with ${percentage}% of the votes.`;
        } else if (no > yes) {
            nextString = `Currently we are leaning towards <a:no:${emoji.no}> **no** with ${100 - percentage}% of the votes.`;
        } else {
            nextString = "The votes are currently tied!";
        }
        embed.fields[2].value = nextString;
        reaction.message.edit({ "embed": embed });
    }

    static closePoll(message) {
    }
}

module.exports = Survey;