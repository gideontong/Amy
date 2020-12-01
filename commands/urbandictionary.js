const host = 'api.urbandictionary.com'
const endpoint = '/v0/define';
const colors = 0xFFFFFF;

const { request } = require('../lib/Internet');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Returns an urban dictionary definition
 * @param {Client} client Discord server client
 * @param {Message} msg Message
 * @param {Array} args Command arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length > 1) {
        args.shift();
        try {
            request(host, endpoint, 'GET', {
                'term': args.join(' ')
            }, function (data) {
                if (data.list && data.list.length > 0) {
                    var description, word;
                    let likes = 0;
                    for (item of data.list) {
                        if (item.thumbs_up > likes) {
                            likes = item.thumbs_up;
                            word = item.word;
                            description = item.definition.length > 3000 ? item.definition.substr(0, 3000) : item.definition;
                        }
                    }
                    let definition = new MessageEmbed()
                        .setColor(Math.floor(Math.random() * colors))
                        .setDescription(description)
                        .setFooter(`${likes} likes`)
                        .setTitle(word);
                    msg.channel.send(definition);
                } else {
                    msg.channel.send("There aren't any definitions for this word!");
                }
            });
        } catch (err) {
            msg.channel.send('I was trying to find your word, but something weird happened. Sorry!');
            log.error(`While trying to look up Urban Dictionary I got ${err}`);
        }
    } else {
        msg.channel.send("Hey! You can't ask me for a definition of nothing?");
    }
}