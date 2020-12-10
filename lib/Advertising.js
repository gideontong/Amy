const colors = 0xFFFFFF;

const { domain, ads } = require('../config/ads.json');
const { MessageEmbed } = require('discord.js');

/**
 * Common advertising engine
 * @class
 */
class Advertising {
    /**
     * Returns a random advertisement from the database
     */
    static random() {
        return ads[Math.floor(Math.random() * ads.length)];
    }

    /**
     * Formats an advertisement text
     * @param {JSON} ad Advertisement
     */
    static formatText(ad) {
        return `${ad.text} [Click here to get ${ad.name}](http://${domain}/${ad.link})`;
    }

    /**
     * Generates a random field-based ad
     */
    static randomField() {
        const ad = Advertising.random();
        const field = {
            name: 'Advertisement',
            value: Advertising.formatText(ad)
        };
        return field;
    }

    /**
     * Generates a random embedded advertisement
     */
    static randomEmbed() {
        const ad = Advertising.random();
        const embed = new MessageEmbed()
            .setColor(Math.floor(Math.random() * colors))
            .setDescription(Advertising.formatText(ad))
            .setFooter('Advertisements help the bot remain free!')
            .setTitle('Advertismenet');
        return embed;
    }
}

module.exports = Advertising;