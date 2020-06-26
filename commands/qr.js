// Imports from dependencies
const QRCode = require('qrcode');
const fs = require('fs');
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
        var base64Data = url.replace(/^data:image\/png;base64,/, "");
    });
}