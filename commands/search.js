const googleBlue = 0x4C8BF5;

const { getGoogleSearch } = require('../lib/Internet');
const { MessageEmbed } = require('discord.js');

/**
 * Search for something on the internet
 * @param {Client} client Discord server client
 * @param {Message} msg Commad
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('You have to give me something to search for!');
        return;
    }
    const query = msg.content.substring(args[0].length + 1);
    getGoogleSearch(function (results) {
        var embed = new MessageEmbed()
            .addFields(coalesceResults(results.results))
            .setColor(googleBlue)
            .setFooter('Amy\'s Search Engine Powered by Google');
        if (results.corrected) embed.setDescription(`*Did you mean: ${results.corrected}?*`);
        msg.channel.send(embed);
    }, query);
}

/**
 * Render all Google.Result(s) into Discord.Field(s)
 * @param {Array} results Array of Result objects from Google Custom Search
 * @returns {Object} Fields
 */
function coalesceResults(results) {
    var fields = [];
    results.forEach(result => {
        fields.push(renderResult(result));
    });
    return fields;
}

/**
 * Render Google.Result into Discord.Field
 * @param {Object} result Result object from Google Custom Search
 * @returns {Object} Field
 */
function renderResult(result) {
    const field = {
        name: result.title,
        value: `[Click here to view](${result.link}): ${result.snippet}`
    }
    return field;
}