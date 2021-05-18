const error = 'Send money to friends with `pay <user> <amount>`';

const { currency } = require('../../config/economy.json');

const { transferBalance } = require('../../lib/Member');
const log = require('log4js').getLogger('amy');

/**
 * Pay another user
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const payor = msg.author.id;

    if (args.length != 3) {
        return channel.send({
            embed: {
                title: 'Error!',
                description: error
            }
        })
            .catch(_ => { });
    }

    var payee;
    var amount;
    try {
        payee = msg.mentions.users.first();
        amount = parseInt(args[args.length - 1]);
    } catch (err) {
        return channel.send({
            embed: {
                title: 'Error!',
                description: error
            }
        })
            .catch(_ => { });
    }

    if (payor == payee.id) {
        return channel.send({
            embed: {
                title: 'Duplicate money glitch?',
                description: "You can't pay yourself..."
            }
        })
            .catch(_ => { });
    }

    if (payee.bot) {
        return channel.send({
            embed: {
                title: 'Charitable donation?',
                description: "You can't pay bots..."
            }
        })
            .catch(_ => { });
    }
    
    if (payor && payee && amount) {
        const err = transferBalance(payor, payee.id, amount, false, function (data) {
            if (data) {
                log.info(`${msg.author.tag} transferred ${amount} to ${payee.tag}`);
                return channel.send({
                    embed: {
                        title: 'Money Sent',
                        description: `Successfully transferred ${currency}${amount} to <@${payee.id}>!`
                    }
                })
                    .catch(_ => { });
            }
            else {
                return channel.send({
                    embed: {
                        description: "Couldn't send money. Maybe you don't have enough?"
                    }
                })
                    .catch(_ => { });
            }
        });

        if (err) {
            return channel.send(err)
                .catch(_ => { });
        }
    } else {
        return channel.send({
            embed: {
                description: error
            }
        })
            .catch(_ => { });
    }
}