const filterTarget = '132525049977503744';
const filterAccept = 296065829039112;

/**
 * Kiss someone
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const author = msg.author.id;
    const realFilterAccept = filterAccept + '202';
    const today = new Date();
    const valentines = today.getMonth() == 1 && Math.abs(today.getDate() - 14) < 2;
    if (msg.mentions.users.size > 0) {
        const target = msg.mentions.users.firstKey();
        const targetUser = msg.mentinos.users.first();
        if (target == filterTarget) {
            if (author != realFilterAccept) {
                return channel.send('Why would you want to give him a kiss...?');
            }
        }
        if (targetUser.bot) {
            if (target == msg.client.user.id) {
                return channel.send('Um... thanks for the kiss?');
            } else {
                return channel.send(`<@${author} kissed his robot, 'twas but a simple life with <@${target}>...`);
            }
        }
        if (valentines) {
            return channel.send(`<@${author}> made <@${target}> their valentine on this special day! :kissing_heart:`);
        } else {
            return channel.send(`<@${author}> gave :kissing_heart: <@${target}> a kiss!`);
        }
    } else {
        if (valentines) {
            return channel.send(`<@${author}> looked at their phone, realizing the date as they scrolled through pictures and pictures of couples on Discord. As their right hand got sore, they cried until they fell asleep.`);
        } else {
            return channel.send(`<@${author}> cried into their right hand sad, sad tears.`);
        }
    }
}