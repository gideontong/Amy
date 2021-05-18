const timeout = 600;
const googleBlue = 0x4C8BF5;

const { getGoogleSearch } = require('../../lib/Internet');
const { MessageEmbed } = require('discord.js');

/**
 * Search for something on the internet
 * @param {Message} msg Commad
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    if (args.length < 2) {
        return channel.send({
            embed: {
                description: 'You have to give me something to search for!'
            }
        })
            .catch(_ => { });
    }

    const query = msg.content.substring(args[0].length + 1);
    getGoogleSearch(function (results) {
        var embed = new MessageEmbed()
            .addFields(coalesceResults(results.results))
            .setColor(googleBlue)
            .setDescription(`Got ${results.count} results in ${results.time} seconds.${results.corrected ? '\n*Did you mean: ' + results.corrected + '?*' : ''}`)
            .setFooter(`React 🗑 within 10 minutes to delete this search result.`)
            .setTitle(`Search Results for ${query}`);
        channel.send(embed)
            .then(searchResultBox => {
                searchResultBox.react('🗑');
                const filter = (reaction, user) => {
                    return reaction.emoji.name == '🗑'  && user.id == msg.author.id;
                };
                searchResultBox.awaitReactions(filter, { max: 1, time: timeout * 1000, errors: ['time'] })
                    .then(_ => {
                        msg.delete();
                        searchResultBox.delete();
                    })
                    .catch(_ => {
                        embed.setFooter('This search result can no longer be deleteed.');
                        searchResultBox.edit(embed);
                    });
            })
            .catch(_ => { });
    }, query, !msg.channel.nsfw);
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
        value: `[Click here to view](${result.link}): ${result.snippet ? result.snippet.split('\n').join('') : 'No description'}`
    }
    return field;
}