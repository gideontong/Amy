const { emoji } = require('../config/config.json');

// Dependencies
const { MessageEmbed } = require("discord.js");

module.exports = async (reaction, user) => {
    let run = reaction.me && reaction.message.editable && !user.bot;
    if (run) {
        let embed = reaction.message.embeds[0].toJSON();
        let yesEmoji = reaction.message.reactions.cache.get(emoji.yes);
        let noEmoji = reaction.message.reactions.cache.get(emoji.no);
        let yes = yesEmoji ? yesEmoji.count - 1 : 0;
        let no = noEmoji ? noEmoji.count - 1 : 0;
        let percentage = Math.round((yes / (yes + no)) * 100);
        let nextString = embed.fields[2].value;
        if (yes > no) {
            nextString = `Currently we are leaning towards <a:yes:${emoji.yes}> with ${percentage}% of the votes.`;
        } else if (no > yes) {
            nextString = `Currently we are leaning towards <a:no:${emoji.no}> with ${100 - percentage}% of the votes.`;
        } else {
            nextString = "The votes are currently tied!";
        }
        embed.fields[2].value = nextString;
        reaction.message.edit({ "embed": embed });
    }
}