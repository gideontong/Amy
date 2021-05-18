const { currency } = require('../../config/economy.json');
const { getBalance } = require('../../lib/Member');
const log = require('log4js').getLogger('amy');

/**
 * Check your balance
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;

    const err = getBalance(msg.author.id, function (data) {
        channel.send(`You have ${currency}${data} in your wallet!`)
            .catch(_ => { });
        log.info(`${msg.author.tag} requested their balance`);
    });
    
    if (err) {
        channel.send(err)
            .catch(_ => { });
    }
}