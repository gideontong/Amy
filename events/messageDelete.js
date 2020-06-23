const responses = require('../config/responses.json');
const targets = require('../config/targets.json');
// const Discord = require('discord.js');
const log = require('log4js').getLogger('amy');

module.exports = async message => {
    if(message.author.bot) return;
    log.info(`${message.author.tag} ${message.author} deleted "${message.cleanContent}"`);
    response = "you deleted a message, but I couldn't think of anything to say! (*This is an error. Please contact <@"
        + targets.gideon + "> for support.*)"
    if(message.author.tag.id == targets.leo && message.attachments.keyArray().length > 0) {
        // Replace with a picture of Leo per issue #5
        // https://github.com/gideontong/Amy/issues/5
        response = responses.delete[Math.floor(Math.random() * responses.delete.length)];
    } else {
        response = responses.delete[Math.floor(Math.random() * responses.delete.length)];
    }
    message.reply(response);
}