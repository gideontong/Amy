const host = 'www.alphavantage.co';
const endpoint = '/query';
const colors = 0xFFFFFF;

const { prefix } = require('../config/config.json');
const { stocks } = require('../config/secrets.json');
const { authenticatedGet } = require('../lib/Internet');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Get a stock price
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 2) {
        msg.channel.send(`You need to provide a stock ticker to get the current price of! Example: ${prefix}stockprice AAPL`);
        return;
    }
    let query = {
        'function': 'GLOBAL_QUOTE',
        'symbol': args[1],
        'apikey': stocks
    };
    log.info(`Requesting the stock price of ${args[1]}`);
    authenticatedGet(function (data) {
        if (data && data['Global Quote'] && data['Global Quote']['01. symbol']) {
            quote = data['Global Quote']
            const embed = new MessageEmbed()
                .addField('Current Price', quote['05. price'] ? quote['05. price'] : 'Unknown', true)
                .addField('Change', quote['09. change'] ? quote['09. change'] : 'Unknown', true)
                .addField('%', quote['10. change percent'] ? quote['10. change percent'] : 'Unknown', true)
                .setAuthor("Amy's Trading Account", 'https://i.imgur.com/t9cmLXd.png')
                .setColor(Math.floor(Math.random() * colors))
                .setTitle(`Current Stock Price for ${quote['01. symbol']}`);
            msg.channel.send(embed);
            return;
        } else {
            msg.channel.send("That isn't a stock ticker or something happened! Try again?");
            return;
        }
    }, host, endpoint, query);
}