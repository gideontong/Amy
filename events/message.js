const responses = ('../config/responses.json');
// const Discord = require('discord.js');
const log = require('log4js').getLogger('amy');

module.exports = async message => {
    if(message.author.bot) return;
    sanitizedMessage = message.content.toLowerCase();
    if(sanitizedMessage.includes('valorant')) {
        if(Math.random() < 0.5) {
            if(Math.random() < 0.9) {
                message.reply("it's time to play Valorant!");
            } else {
                message.reply("it's not time to play Valorant...");
            }
        }
        log.info(`${message.author} mentioned VALORANT!`)
    } else if(sanitizedMessage.includes('skyfactory')) {
        if(Math.random() < 1.0) {
            if(Math.random() < 0.9) {
                message.reply("it's time to play Sky Factory 4!");
            } else {
                message.reply("it's not time to play Sky Factory 4...");
            }
        }
        log.info(`${message.author} mentioned SkyFactory!`);
    } else if (sanitizedMessage.includes('photo of leo')) {
        response = respones.requester[Math.floor(Math.random() * responses.requester.length)] + ": " + respones.photo[Math.floor(Math.random() * responses.photo.length)];
        message.reply(response);
        log.info(`${message.author} requested a picture of Leo!`);
    }
}