const allowed = [
    'days',
    'weeks',
    'months',
    'years'
];

const { setPremium } = require('../../lib/Member');
const log = require('log4js').getLogger('amy');

/**
 * Grants premium
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length != 4 ||
        msg.mentions.users.size != 1 ||
        isNaN(args[2]) ||
        allowed.includes(args[3])) {
        msg.channel.send('Grant premium status with `grantpremium <user> <length> <days|weeks|months|years>`');
    }
    const snowflake = msg.mentions.users.firstKey();
    let days = parseInt(args[2]);
    switch (args[3]) {
        case 'weeks':
            days *= 7;
            break;
        case 'months':
            days *= 30;
            break;
        case 'years':
            days *= 365;
            break;
        default:
            break;
    }
    log.info(`Granting premium with command: ${msg.content}`);
    setPremium(function (premium, expiry) {
        if (premium) {
            msg.channel.send(`Granted premium! <@${snowflake}>'s premium now expires on ${expiry.toDateString()}.`);
        } else {
            msg.channel.send('Something went wrong and was unable to give premium.')
        }
    }, snowflake, days);
}