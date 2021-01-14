const link = 'https://amyhelps.ml/timezone/index.html';

const { setTimezone, checkCooldown } = require('../../lib/Member');
const log = require('log4js').getLogger('amy');

/**
 * Set your timezone!
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length < 2) {
        msg.channel.send(`You need to provide me a timezone in the TZ format in order to update your timezone! Don't know what that is? Use our auto-detector to find out yours: ${link}`);
        return;
    }
    try {
        var future = new Date();
        future.setDate(future.getDate() + 7);
        checkCooldown(msg.author.id, 'timezone', function (data) {
            if (data) {
                try {
                    const timezone = Intl.DateTimeFormat(undefined, { timeZone: args[1] }).resolvedOptions().timeZone;
                    if (timezone) {
                        const err = setTimezone(msg.author.id, timezone);
                        if (err) {
                            msg.channel.send(err);
                            log.error(`${msg.author.tag} called timezone with ${args[1]} but it failed.`);
                        }
                    }
                    return;
                } catch (err) {
                    msg.channel.send(`I couldn't find that as a valid timezone! Use our autodetector to find yours: ${link}`);
                    log.warn(`Tried to get timezone with user input ${args[1]} and failed!`);
                    return;
                }
            } else {
                msg.channel.send('You only can change your timezone once a week!');
                return;
            }
        }, future);
    } catch (err) {
        msg.channel.send('Something strange happened. Ask a developer for help!');
        log.err(`In timezone command I got: ${err}`);
        return;
    }
}