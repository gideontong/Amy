const colors = 0xFFFFFF;

const { domain, ads } = require('../config/ads.json');
const { ads: chance } = require('../config/config.json').probabilities;
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
     * Test whether or not it's a good time to send an ad
     * @param {Guild} guild The Discord server trying to send an ad in
     * @param {GuildChannel} channel The Discord channel trying to send an ad
     * @param {User} user The user that triggered the ad
     */
    static determine(guild, channel, user) {
        // TODO: Employ ratelimiting
        return Math.random() < chance;
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