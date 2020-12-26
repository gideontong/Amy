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
const genericFailure = {
    title: "Didn't pick an option in time!",
    description: 'You failed to pick an option in time. Run the `trivia` command again?',
    color: 0xFF0033,
    footer: {
        text: 'Fun fact: I know thousands of trivia questions.'
    }
};

const log = require('log4js').getLogger('amy');

/**
 * Play a trivia game singleplayer or multiplayer!
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    let color = 0;
    var menu = {
        title: "Welcome to Amy's Trivia Game!",
        description: "This game supports both singleplayer and multiplayer. The more people that play, the bigger the prize pool. Compete to win large prizes!\n\nDo you want to play __singleplayer__ or __multiplayer__?\n:bust_in_silhouette: Singleplayer\n:busts_in_silhouette: Multiplayer",
        color: colors[color % colors.length],
        footer: {
            text: `You have ${timeout} seconds to answer.`
        }
    };
    msg.channel.send({ embed: menu })
        .then(mainMenu => {
            color++;
            const filter = (reaction, user) => {
                return ['👤', '👥'].includes(reaction.emoji.name) && user.id == msg.author.id;
            }
            mainMenu.react('👤');
            mainMenu.react('👥');
            mainMenu.awaitReactions(filter, { max: 1, time: timeout * 1000, errors: ['time'] })
                .then(collected => {
                    const multiplayer = collected.first().emoji.name == '👥';
                    menu.color = colors[color % colors.length];
                    menu.footer = `You have selected ${multiplayer ? 'multiplayer' : 'singleplayer'} and this menu is no longer active.`; 
                    color++;
                    mainMenu.edit(menu);
                    play(msg.author, msg.channel, color, multiplayer);
                    return;
                })
                .catch(collected => {
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
                    return;
                });
        })
        .catch(err => { });
}

/**
 * Main game runtime
 * @param {User} starter User who started the game
 * @param {TextChannel} channel Channel to play the game in
 * @param {Number} color Current color the value is on.
 * @param {Boolean} multiplayer Whether or not to play the game in multiplayer
 */
function play(starter, channel, color = 0, multiplayer = false) {
    const questionEmbed = {
        title: 'How many questions of trivia?',
        description: `How many questions of trivia do you want to play? You ${multiplayer ? 'and your friends ' : ''}will be given ${timeout} seconds per question.\n\n🤠 3 Questions\n🥳 5 Questions\n🤓 7 Questions\n🤯 10 Questions`,
        color: colors[color % colors.length],
        footer: `You have ${timeout} seconds to choose.`
    };
    color++;
    channel.send({ embed: questionEmbed })
        .then(questionMenu => {
            const questionOptions = {
                '🤠': 3,
                '🥳': 5, 
                '🤓': 7,
                '🤯': 10
            };
            const filter = (reaction, user) => {
                return Object.keys(questionOptions).includes(reaction.emoji.name) && user.id == starter.id;
            }
            Object.keys(questionOptions).forEach(emoji => {
                questionMenu.react(emoji);
            });
            questionMenu.awaitreactions(filter, { max: 1, time: timeout * 1000, errors: ['time'] })
                .then(collected => {
                })
                .catch(collected => {
                    questionMenu.edit({ embed: genericFailure });
                    log.warn("Couldn't start trivia game due to timeout");
                    return;
                });
        })
        .catch(err => { });
}