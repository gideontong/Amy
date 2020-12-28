const pleading = '<:pleading:792119409551867925>';

/**
 * Slap someone
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (msg.mentions.users.size > 0) {
        const snowflake = msg.mentions.users.firstKey();
        if (snowflake == client.user.id) {
            msg.reply(`Why are you trying to slap me? ${pleading} ${pleading}`);
            return;
        }
        msg.channel.send(`<@${msg.author.id}> 🤚💥 slapped <@${snowflake}> across the face! React with 🤚 in 5 seconds to retaliate!`)
            .then(message => {
                message.react('🤚');
                const filter = (reaction, user) => {
                    return reaction.emoji.name == '🤚' && user.id == snowflake;
                }
                message.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
                    .then(collected => {
                        msg.channel.send(`<@${snowflake}> 🤚💥 punched <@${msg.author.id}> back!`);
                    })
                    .catch(collected => { });
            });
    } else {
        msg.channel.send('You... want to punch yourself?');
    }
}