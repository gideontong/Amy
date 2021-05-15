/**
 * Is there an imposter?
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const members = channel.members;
    const member = members.randomKey();
    
    var impostors = members.size > 3 ? 2 : 0;
    const messages = [
        '. 　　　。　　　　•　 　ﾟ　　。 　　.',
        '　　　.　　　 　　.　　　　　。　　 。　. 　',
        '.　　 。　　　　　 ඞ 。 . 　　 • 　　　　•',
        `　　ﾟ  <@${member}> was an impostor.　 。　.`,
        `　　'　　　 ${impostors} Impostors Remain 　 　　。`,
        '　　ﾟ　　　.　　　. ,　　　　.　 .'
    ];
    channel.send({
        embed: {
            description: messages.join('\n')
        }
    });
}