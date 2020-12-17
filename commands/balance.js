const { getBalance } = require('../lib/Member');
const log = require('log4js').getLogger('amy');

/**
 * Check your balance
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    const err = getBalance(msg.author.id, function (data) {
        msg.channel.send(`You have $${data} in your wallet!`);
        log.info(`${msg.author.tag} requested their balance`);
    });
    if (err) {
        msg.channel.send(err)
            .catch(err => { });
    }
}