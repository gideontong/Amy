const link = 'https://amyhelps.ml/timezone/index.html';

const log = require('log4js').getLogger('amy');

/**
 * Set your timezone!
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 2) {
        msg.channel.send(`You need to provide me a timezone in the TZ format in order to update your timezone! Don't know what that is? Use our auto-detector to find out yours: ${link}`);
        return;
    }
    try {
        let timezone = Intl.DateTimeFormat(undefined, { timeZone: args[1] }).resolvedOptions().timeZone;
        msg.channel.send(timezone);
    } catch (err) {
        msg.channel.send(`I couldn't find that as a valid timezone! Use our autodetector to find yours: ${link}`);
        log.warn(`Tried to get timezone with user input ${args[1]} and failed!`);
    }
}