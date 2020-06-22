const responses = ('../config/responses.json');
const Discord = require('discord.js');
const log = require('log4js').getLogger('amy');

module.exports = async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().includes('valorant')) {
        if(Math.random() < 0.5) {
            if(Math.random() < 0.9) {
                message.reply("it's time to play Valorant!");
            } else {
                message.reply("it's not time to play Valorant...");
            }
        }
        log.info(`${message.author} mentioned VALORANT!`)
    }
}