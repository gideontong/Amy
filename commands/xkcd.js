const host = 'xkcd.com';
const endpoint = '/info.0.json';
const profiles = [
    "https://i.imgur.com/TTGz4ja.png",
    "https://i.imgur.com/wxK2P7z.png",
    "https://i.imgur.com/UX2IskU.png"
];
const fallback = 'https://i.imgur.com/YoH3L58.png';
const colors = 0xFFFFFF;

const { MessageEmbed } = require('discord.js');
const { authenticatedGet } = require('../lib/Internet');

/**
 * Get a random XKCD
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    authenticatedGet(function (data) {
        if (data) {
            const embed = new MessageEmbed()
                .setAuthor('xkcd', profiles[Math.floor(Math.random() * profiles.length)])
                .setColor(Math.floor(Math.random() * colors))
                .setFooter(data.alt ? data.alt : 'No caption.')
                .setImage(data.img ? data.img : fallback)
                .setTitle(data.safe_title ? data.safe_title : 'No title.', data.link);
            msg.channel.send(embed);
        } else {
            msg.channel.send('Hmm... something went wrong. Try again?');
        }
    }, host, endpoint);
}