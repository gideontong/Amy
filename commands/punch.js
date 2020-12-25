/**
 * Punch someone
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (msg.mentions.users.size > 0) {
        const snowflake = msg.mentions.users.firstKey();
        msg.channel.send(`<@${msg.author.id}> 🤜💥 punched <@${snowflake}> hard! React with 👊 in 5 seconds to retaliate!`)
            .then(message => {
                message.react('👊');
                const filter = (reaction, user) => {
                    return reaction.emoji.name == '👊' && user.id == snowflake;
                }
                message.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
                    .then(collected => {
                        msg.channel.send(`<@${snowflake}> 🤜💥 punched <@${msg.author.id}> back!`);
                    })
                    .catch(collected => { });
            });
    } else {
        msg.channel.send('You... want to punch yourself?');
    }
}