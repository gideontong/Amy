// Imports from local config files
const responses = require('../config/responses.json');
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

// Handler for a deleted message
module.exports = async message => {
    if (message.author.bot) return;
    if (message.author == targets.gideon && message.content[0] == "!") return;
    log.info(`${message.author.tag} ${message.author} deleted "${message.cleanContent} [${message.attachments.keyArray().length}]"`);
    if (message.author.id == targets.leo && message.attachments.keyArray().length > 0) {
        response = new MessageEmbed()
            .setTitle('Leo, wait a second!')
            .setDescription('Do you remember that time we were together?')
            .setImage("https://amyhelps.ml/leo/" + Math.floor(Math.random() * 16) + ".jpg");
    } else {
        response = "<@" + message.author.id + "> "
            + responses.delete[Math.floor(Math.random() * responses.delete.length)];
    }
    message.channel.send(response);
}