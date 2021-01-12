const { setBalance } = require('../lib/Member');
const { extractSnowflake } = require('../lib/Validation');
const log = require('log4js').getLogger('amy');

/**
 * Set a user balance
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length != 3) {
        msg.channel.send('Command usage: `setbalance <user> <amount>`');
        return;
    }
    try {
        const snowflake = extractSnowflake(args[1]);
        const amount = parseInt(args[2]);
        if (snowflake && amount) {
            setBalance(snowflake, amount, function (data) {
                msg.channel.send(`Successfully set <@${snowflake}>'s balance to $${data}!`);
            });
        } else {
            msg.channel.send('Either snowflake or amount failed to parse. Check logs.');
            log.error(`Failed to parse, got snowflake: ${snowflake} and amount: ${amount}`);
        }
    } catch (err) {
        msg.channel.send('Something strange happened, check the logs.');
        log.error(`Tried to set balance, got ${err}`);
    }
}