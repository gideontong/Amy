/**
 * Ban a user, provide a reason
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const member = msg.member;
    if (member && member.hasPermission('BAN_MEMBERS')) {
        if (msg.mentions.members && msg.mentions.members.size() > 0) {
            const reason = msg.content.substring(args[0].length + 1);
            const toBan = msg.mentions.members.first();
            toBan.createDM()
                .then(dm => {
                    try {
                        toBan.ban();
                        const banned = {
                            title: "You were banned!",
                            description: "A moderator banned you from a server you were in for the following reason:",
                            color: null,
                            fields: [
                                {
                                    name: "Reason",
                                    value: reason
                                }
                            ]
                        };
                        dm.send({ embed: banned });
                        channel.success(`<@${toBan.id}> has been banned for reason: ${reason}`);
                    } catch (_) { }
                });
        } else {
            channel.send({
                embed: {
                    description: 'Message the user you wish to ban and provide a reason why!'
                }
            })
                .catch(_ => { });
        }
    } else {
        msg.react('<a:no:729594117017042964>');
    }
}