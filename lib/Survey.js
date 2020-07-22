const defaultColor = 10873618;
const mcChoices = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '0️⃣'];

const { emoji } = require('../config/config.json');
const { formatTimes } = require('./Today');
class Survey {
    static createQuickPoll(bot, channel, question, mentions = "Kids", color = defaultColor) {
        try {
            let embed = {
                "content": `Hey! ${mentions}, it's time to answer a survey!`,
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
                    id = Survey.addPollId(message, message.id);
                });
            return [true, id];
        } catch (err) {
            return [false, err];
        }
    }

    static createMultipleChoicePoll(channel, question, choices, mentions = "Kids", color = defaultColor) {
        if (choices.length < 1 || choices.length > 10) return [false, "only 1-10 options allowed!"];
        var emojiString = "", optionsString = "";
        for (var i = 0; i < choices.length; i++) {
            emojiString += mcChoices[i] + '\n';
            optionsString += choices[i] + '\n';
        }
        let embed = {
            "content": `Hey! ${mentions}, it's time to answer a survey!`,
            "embed": {
                "title": "Survey Time",
                "description": question,
                "color": 10873618,
                "fields": [
                    {
                        "name": "__Selection__",
                        "value": emojiString,
                        "inline": true
                    },
                    {
                        "name": "__Options__",
                        "value": optionsString,
                        "inline": true
                    },
                    {
                        "name": "Results",
                        "value": "Currently, no one has voted!"
                    }
                ],
                "footer": {
                    "text": "Polls ID: mc.loading..."
                }
            }
        }
        var id = 0;
        channel.send(embed)
            .then((message) => {
                for (var i = 0; i < choices.length; i++) {
                    message.react(mcChoices[i]);
                }
                id = Survey.addPollId(message, message.id);
            });
        return [true, id];
    }

    // TODO: Add game boxart support
    static createGamePoll(bot, channel, game, options, boxart = "", mentions = "Kids", color = defaultColor) {
        try {
            if (options.length < 1) throw "Needs at least one option!";
            else if (options.length > 10) throw "Can't have more than 10 options!";
            options = formatTimes(options);
            var emojiString = "", optionsString = "";
            if (options.length == 1) options = [options[0], "Some other time?"];
            for (var i = 0; i < options.length; i++) {
                emojiString += mcChoices[i] + '\n';
                optionsString += options[i] + '\n';
            }
            let embed = {
                "content": `Hey! ${mentions}, it's time to answer a survey!`,
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
                    },
                    "footer": {
                        "text": "Polls ID: game.loading..."
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
                    id = Survey.addPollId(message, message.id);
                });
            return [true, id];
        } catch (err) {
            return [false, err];
        }
    }

    // Returns the ID of the message
    static addPollId(message, id) {
        let embed = message.embeds[0].toJSON();
        let [pollType, pollID] = Survey.getPollData(embed.footer.text);
        if (pollID == 'loading') {
            embed.footer.text = "Polls ID: " + pollType + "." + id;
            message.edit({ "embed": embed });
            return id;
        } else {
            return pollID;
        }
    }

    // Returns [poll type, poll ID]
    static getPollData(idString) {
        let words = idString.split(' ')[2].split('.');
        return [words[0], words[1]];
    }

    static updateExistingPoll(reaction) {
        let embed = reaction.message.embeds[0].toJSON();
        let [pollType, pollID] = Survey.getPollData(embed.footer.text);
        if (pollType == 'mc') {
            let choiceCounts = []
            for (var i = 0; i < mcChoices.length; i++) {
                choiceCounts[i] = reaction.message.reactions.cache.get(mcChoices[i]).count;
            }
            console.log(choiceCounts);
        } else {
            let field = pollType == 'game' ? 3 : 2;
            let yesEmoji = reaction.message.reactions.cache.get(emoji.yes);
            let noEmoji = reaction.message.reactions.cache.get(emoji.no);
            let yes = yesEmoji ? yesEmoji.count - 1 : 0;
            let no = noEmoji ? noEmoji.count - 1 : 0;
            let percentage = yes + no == 0 ? 0 : Math.round((yes / (yes + no)) * 100);
            let nextString = embed.fields[field].value;
            if (yes > no) {
                nextString = `Currently we are leaning towards <a:yes:${emoji.yes}> **yes** with ${percentage}% of the votes.`;
            } else if (no > yes) {
                nextString = `Currently we are leaning towards <a:no:${emoji.no}> **no** with ${100 - percentage}% of the votes.`;
            } else {
                nextString = "The votes are currently tied!";
            }
            embed.fields[field].value = nextString;
            reaction.message.edit({ "embed": embed });
        }
    }

    static closePoll(message) {
    }
}

module.exports = Survey;