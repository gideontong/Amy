const { currency, passives } = require('../config/economy.json');
const { checkCooldown, updateBalance } = require("../lib/Member");

/**
 * Your... paycheck?
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    checkCooldown(msg.author.id, 'monthly', function (err = null) {
        if (err) {
            msg.channel.send('You must wait 30 days to get your next monthly!');
        } else {
            updateBalance(msg.author.id, passives.monthly, function (amount) {
                msg.channel.send(`Congratulations, ${msg.member.nickname ? msg.member.nickname : msg.author.username}! You were granted ${currency}${passives.monthly} and you now have ${currency}${amount} in your account.`);
            });
        }
    }, expiry);
}