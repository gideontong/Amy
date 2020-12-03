const host = 'www.alphavantage.co';
const endpoint = '/query';
const colors = 0xFFFFFF;

const { prefix } = require('../config/config.json');
const { stocks } = require('../config/secrets.json');
const { authenticatedGet } = require('../lib/Internet');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Grabs the exchange rate of a currency
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 3) {
        msg.channel.send(`You need to provide the two currencies you are trying to convert! Example: ${prefix}exchangerate USD TWD`);
        return;
    }
    let query = {
        'function': 'CURRENCY_EXCHANGE_RATE',
        'from_currency': args[1],
        'to_currency': args[2],
        'apikey': stocks
    };
    log.info(`${msg.author.tag} requested the exchange rate of ${args[1]}:${args[2]}`);
    authenticatedGet(function (data) {
        if (data && data['Realtime Currency Exchange Rate'] && data['Realtime Currency Exchange Rate']['1. From_Currency Code']) {
            quote = data['Realtime Currency Exchange Rate']
            const embed = new MessageEmbed()
                .setAuthor('Amy, the World Traveller', 'https://i.imgur.com/fN9Ze8V.png')
                .setColor(Math.floor(Math.random() * colors))
                .setDescription(`Currently, 1 ${quote['1. From_Currency Code']} = ${quote['5. Exchange Rate'] ? quote['5. Exchange Rate'] : 'Unknown'} ${quote['3. To_Currency Code'] ? quote['3. To_Currency Code'] : 'Unknown'}`)
                .setTimestamp()
                .setTitle(`Forex Rates to ${quote['4. To_Currency Name'] ? quote['4. To_Currency Name'] : 'Unknown'}`);
            msg.channel.send(embed);
            return;
        } else {
            msg.channel.send("That isn't a currency or something happened! Try again?");
            return;
        }
    }, host, endpoint, query);
}