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

    static randomField() {
        const ad = Advertising.random();
        let field = {
            name: 'Advertisement',
            value: ''
        };
        return field;
    }

    static randomEmbed() {
        const ad = Advertising.random();
        let embed = new MessageEmbed();
        return embed;
    }
}

module.exports = Advertising;