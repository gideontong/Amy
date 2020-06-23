const responses = require('../config/responses.json');
const targets = require('../config/targets.json');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

module.exports = async message => {
    if(message.author.bot) return;
    if (message.cleanContent == "!test") {
        message.reply("... <@" + targets.gideon + ">" + "...");
        return;
    }
    log.info(`${message.author.tag} ${message.author} deleted "${message.cleanContent} [${message.attachments.keyArray().length}]"`);
    if(message.author.id == targets.leo && message.attachments.keyArray().length > 0) {
        response = new MessageEmbed()
            .setTitle('Do you remember that time we were together?')
            .setImage("https://amyhelps.ml/leo/" + Math.floor(Math.random() * 16) + ".jpg");
    } else {
        response = responses.delete[Math.floor(Math.random() * responses.delete.length)];
    }
    message.reply(response);
}