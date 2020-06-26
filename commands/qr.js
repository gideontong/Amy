// Imports from local config files
const config = require('../config/config.json');
const strings = config.strings.qr;
const constants = config.constants;

// Imports from dependencies
const { MessageAttachment } = require('discord.js');
const QRCode = require('qrcode');
const log = require('log4js').getLogger('amy');

// Handler for running qr command
module.exports = async (bot, msg, args) => {
    if (args < 2) {
        msg.reply(strings.empty);
        log.info(`${msg.author.tag} ${msg.author} tried to make an empty QR code`);
        return;
    }
    var text = msg.content.substring(args[0].length + 1);
    if (text.length > 512) {
        msg.reply(strings.tooLarge);
        log.info(`${msg.author.tag} ${msg.author} tried to make a big QR code`);
        return;
    }
    if (Math.random() < constants.trollProbability) text = strings.troll;
    QRCode.toDataURL(text, function (err, url) {
        const buffer = new Buffer(url, 'base64');
        const image = new MessageAttachment(`data:image/jpeg;base64,${url}`);
        msg.channel.send(`${msg.author} made a cool QR code`, image);
    });
    log.info(`${msg.author.tag} ${msg.author} generated a QR code`);
}