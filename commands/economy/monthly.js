const { currency, passives } = require('../../config/economy.json');
const { updateBalance } = require('../../lib/Member');

/**
 * Your... paycheck?
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    updateBalance(msg.author.id, passives.monthly, function (amount) {
        msg.channel.send(`Congratulations, ${msg.member.nickname ? msg.member.nickname : msg.author.username}! You were granted ${currency}${passives.monthly} and you now have ${currency}${amount} in your account.`);
    });
}