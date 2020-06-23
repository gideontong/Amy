const responses = require('../config/responses.json');
const targets = require('../config/targets.json');
// const Discord = require('discord.js');
const log = require('log4js').getLogger('amy');

module.exports = async message => {
    if(message.author.bot) return;
    log.info(`${message.author.tag} ${message.author} deleted "${message.cleanContent} [${message.attachments.keyArray().length}]"`);
    response = "you deleted a message, but I couldn't think of anything to say! (*This is an error. Please contact <@"
        + targets.gideon + "> for support.*)"
    if(message.author.id == targets.leo && message.attachments.keyArray().length > 0) {
        response = "Do you remember that time we were together? https://amyhelps.ml/leo/" + Math.floor(Math.random() * 16) + ".jpg";
    } else {
        response = responses.delete[Math.floor(Math.random() * responses.delete.length)];
    }
    message.reply(response);
}