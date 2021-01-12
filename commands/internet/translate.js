const colors = 0xFFFFFF;
const host = 'api.mymemory.translated.net';
const endpoint = '/get';
const error = 'Hmm... something went wrong. Ping Gideon for help.';
const help = 'To use this command, type translate <language> <statement>, like translate Spanish Hello!';

const { pairs, names } = require('../../config/languages.json');
const { request } = require('../../lib/Internet');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Attempts a machine translation
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length < 3) {
        msg.channel.send(help);
        return;
    }
    const string = msg.cleanContent.substr(args[0].length + args[1].length + 2);
    try {
        const language = args[1].toLowerCase();
        if (language in pairs) {
            request(host, endpoint, 'GET', {
                q: string,
                langpair: `en|${pairs[language]}`
            }, function (data) {
                try {
                    const embed = new MessageEmbed()
                        .setColor(Math.floor(Math.random() * colors))
                        .setDescription(data.responseData.translatedText)
                        .setFooter('Translated powered by Amy')
                        .setTitle(`English to ${names[pairs[language]]}`);
                    msg.channel.send(embed);
                } catch (err) {
                    msg.channel.send(error);
                    log.error(`While trying to send a translation I got ${err}`);
                }
            });
        } else {
            msg.channel.send(help);
        }
    } catch (err) {
        msg.channel.send(error);
        log.error(`While trying to get a translation I got ${err}`);
    }
}