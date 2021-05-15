/**
 * Is there an imposter?
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const members = channel.members;
    const member = members.randomKey();
    
    var imposters = members.size > 3 ? 2 : 0;
    const messages = [
        '```. 　　　。　　　　•　 　ﾟ　　。 　　.',
        '　　　.　　　 　　.　　　　　。　　 。　. 　',
        '.　　 。　　　　　 ඞ 。 . 　　 • 　　　　•',
        `　　ﾟ  <@${member}> was an impostor.　 。　.`,
        `　　'　　　 ${imposters} Impostors Remain 　 　　。`,
        '　　ﾟ　　　.　　　. ,　　　　.　 .```'
    ];
    channel.send(messages.join('\n'));
}