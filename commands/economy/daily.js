const { currency, passives } = require('../config/economy.json');
const { checkCooldown, updateBalance } = require("../lib/Member");

/**
 * Get your dailies!
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    let expiry = new Date();
    expiry.setHours(expiry.getHours() + 18);
    checkCooldown(msg.author.id, 'daily', function (err = null) {
        if (err) {
            msg.channel.send('You must wait 24 hours to get your next daily!');
        } else {
            updateBalance(msg.author.id, passives.daily, function (amount) {
                msg.channel.send(`Congratulations, ${msg.member.nickname ? msg.member.nickname : msg.author.username}! You were granted ${currency}${passives.daily} and you now have ${currency}${amount} in your account.`);
            });
        }
    }, expiry);
}