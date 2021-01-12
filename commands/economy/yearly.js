const { currency, passives } = require('../config/economy.json');
const { checkCooldown, updateBalance } = require("../lib/Member");

/**
 * You're really desperate, aren't you?
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    let expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    checkCooldown(msg.author.id, 'yearly', function (err = null) {
        if (err) {
            msg.channel.send('You must wait a year to get your next yearly!');
        } else {
            updateBalance(msg.author.id, passives.yearly, function (amount) {
                msg.channel.send(`Congratulations, ${msg.member.nickname ? msg.member.nickname : msg.author.username}! You were granted ${currency}${passives.yearly} and you now have ${currency}${amount} in your account.`);
            });
        }
    }, expiry);
}