const host = 'api.waifulabs.com';
const endpoint = '/generate';

const { MessageAttachment } = require("discord.js");
const { authenticatedPost } = require("../lib/Internet");
const log = require('log4js').getLogger('amy');

/**
 * Get a random AI-generated waifu
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    authenticatedPost(function (data) {
        try {
            const image = data.newGirls[0].image;
            log.info(image);
            const stream = new Buffer.from(image, 'base64');
            const attachment = new MessageAttachment(stream);
            msg.channel.send(attachment);
        } catch (err) {
            log.error(`While trying to get a waifu I got: ${err}`);
            msg.channel.send('Something went wrong! Ask Gideon for help.');
        }
    }, host, endpoint, {
        step: 0
    });
}