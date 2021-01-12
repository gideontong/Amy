const error = 'Send money to friends with `pay <user> <amount>`';

const { transferBalance } = require('../../lib/Member');
const log = require('log4js').getLogger('amy');

/**
 * Pay another user
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length != 3) {
        msg.channel.send(error);
        return;
    }
    const payor = msg.author.id;
    let payee;
    let amount;
    try {
        payee = msg.mentions.members.firstKey();
        amount = parseInt(args[args.length - 1]);
    } catch (err) {
        msg.channel.send(error);
        return;
    }
    if (payor == payee) {
        msg.reply("You can't pay yourself...");
        return;
    }
    if (payor && payee && amount) {
        const err = transferBalance(payor, payee, amount, false, function (data) {
            if (data) {
            msg.channel.send(`Successfully transferred $${amount} to <@${payee}>!`);
            log.info(`${msg.author.tag} transferred ${amount} to ${msg.mentions.members.first().user.tag}`);
            }
            else {
                msg.channel.send("Couldn't send money. Maybe you don't have enough?");
            }
        });
        if (err) {
            msg.channel.send(err)
                .catch(err => {});
            return;
        }
    } else {
        msg.channel.send(error);
        return;
    }
}