const { MessageAttachment } = require('discord.js');
const QRCode = require('qrcode');
const log = require('log4js').getLogger('amy');

/**
 * Create a QR code
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    if (args < 2) {
        msg.reply('uh... your QR code can not be empty.');
        log.info(`${msg.author.tag} ${msg.author} tried to make an empty QR code`);
        return;
    }
    var text = msg.content.substring(args[0].length + 1);
    if (text.length > 512) {
        msg.reply("I can't fit that much data into a QR code! Try asking <@756208954031341688> instead.");
        log.info(`${msg.author.tag} ${msg.author} tried to make a big QR code`);
        return;
    }
    QRCode.toDataURL(text, function (err, url) {
        const data = url.replace(/^data:image\/png;base64,/, '');
        const buffer = Buffer.from(data, 'base64');
        const image = new MessageAttachment(buffer);
        msg.channel.send(`${msg.author} made a cool QR code`, image);
    });
    log.info(`${msg.author.tag} ${msg.author} generated a QR code`);
}