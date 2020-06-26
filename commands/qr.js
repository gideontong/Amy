// Imports from dependencies
const { MessageAttachment } = require('discord.js');
const QRCode = require('qrcode');
const log = require('log4js').getLogger('amy');

// Handler for running qr command
module.exports = async (bot, msg, args) => {
    if (args < 2) {
        msg.reply('you want me to make a QR code with nothing in it?');
        log.info(`${msg.author.tag} ${msg.author} tried to make an empty QR code`);
        return;
    }
    var text = msg.content.substring(args[0].length);
    if (text.length > 512) {
        msg.reply('I\'m not advanced enough to make a QR code that big, try asking Leo...');
        log.info(`${msg.author.tag} ${msg.author} tried to make a big QR code`);
        return;
    }
    QRCode.toDataURL(text, function (err, url) {
        const buffer = new Buffer(url, 'base64');
        const image = new MessageAttachment(buffer);
        msg.channel.send(`${msg.author} made a cool QR code`, image);
    });
    log.info(`${msg.author.tag} ${msg.author} generated a QR code`);
}