const responses = require('../config/responses.json');
// const Discord = require('discord.js');
const log = require('log4js').getLogger('amy');

module.exports = async message => {
    if(message.author.bot) return;
    log.info(`${message.author} deleted "${message.cleanContent}"`);
    response = responses.delete[Math.floor(Math.random() * responses.delete.length)];
    message.reply(response);
}