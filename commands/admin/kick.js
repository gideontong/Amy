/**
 * Kick a user, provide a reason
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const member = msg.member;
    if (member && member.hasPermission('KICK_MEMBERS')) {
        if (msg.mentions.members && msg.mentions.members.size() > 0) {
            const reason = msg.content.substring(args[0].length + 1);
            const toKick = msg.mentions.members.first();
            toKick.createDM()
                .then(dm => {
                    try {
                        toKick.kick();
                        const kicked = {
                            title: "You were kicked!",
                            description: "A moderator kicked you from a server you were in for the following reason:",
                            color: null,
                            fields: [
                                {
                                    name: "Reason",
                                    value: reason
                                }
                            ]
                        };
                        dm.send({ embed: kicked });
                        channel.success(`<@${toKick.id}> has been kicked for reason: ${reason}`);
                    } catch (err) { }
                });
        } else {
            channel.send('Mention the user you want to kick and a reason why!');
        }
    } else {
        msg.react('<a:no:729594117017042964>');
    }
}