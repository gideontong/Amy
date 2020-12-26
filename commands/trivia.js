const host = 'opentdb.com';
const endpoint = '/api.php';
const timeout = 30;
const colors = [
    0xC17E9B,
    0xCDAB81,
    0xD8D7B9,
    0x87B191,
    0x7397AA,
    0x6E6B9F
];

const log = require('log4js').getLogger('amy');

/**
 * Play a trivia game singleplayer or multiplayer!
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    let color = 0;
    const menu = {
        embed: {
            title: "Welcome to Amy's Trivia Game!",
            description: "This game supports both singleplayer and multiplayer. The more people that play, the bigger the prize pool. Compete to win large prizes!\n\nDo you want to play __singleplayer__ or __multiplayer__?\n:bust_in_silhouette: Singleplayer\n:busts_in_silhouette: Multiplayer",
            color: colors[color % colors.length],
            footer: {
                text: `You have ${timeout} seconds to answer.`
            }
        }
    };
    msg.channel.send(menu)
        .then(mainMenu => {
            color++;
            const filter = (reaction, user) => {
                return ['👤', '👥'].includes(reaction.emoji.name) && user.id == msg.author.id;
            }
            mainMenu.react('👤');
            mainMenu.react('👥');
            mainMenu.awaitReactions(filter, { max: 1, time: timeout * 1000, errors: ['time']})
                .then(collected => {
                    msg.channel.send(collected.first().emoji.toString());
                })
                .catch (collected => {
                    const failure = {
                        title: 'Failed to Start Trivia Game',
                        description: `You didn't respond fast enough to the menu selection.`,
                        color: colors[color % colors.length],
                        footer: {
                            text: 'Run the trivia command again to play!'
                        }
                    };
                    mainMenu.edit({ embed: failure });
                    log.warn("Couldn't start trivia game due to timeout");
                });
        })
        .catch(err => { });
}