const { currency, passives } = require('../../config/economy.json');
const { checkCooldown, updateBalance } = require('../../lib/Member');

/**
 * Get your weeklies!
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    checkCooldown(msg.author.id, 'weekly', function (err = null) {
        if (err) {
            msg.channel.send('You must wait 7 days to get your next weekly!');
        } else {
            updateBalance(msg.author.id, passives.weekly, function (amount) {
                msg.channel.send(`Congratulations, ${msg.member.nickname ? msg.member.nickname : msg.author.username}! You were granted ${currency}${passives.weekly} and you now have ${currency}${amount} in your account.`);
            });
        }
    }, expiry);
}