const host = 'www.roblox.com';
const endpoint = '/games/list-json';
const colors = 0xFFFFFF;
const gameSize = 90;

const { authenticatedGet } = require('../../lib/Internet');
const log = require('log4js').getLogger('amy');

/**
 * Pick a roblox game to play
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    authenticatedGet(function (data) {
        if (Array.isArray(data) && data.length > 0) {
            const game = data[Math.floor(Math.random() * data.length)];
            const embed = {
                title: `Game: ${game.Name}`,
                url: game.GameDetailReferralUrl,
                color: Math.floor(Math.random() * colors),
                author: {
                    name: `Created by ${game.CreatorName}`
                },
                footer: {
                    text: `Played ${game.Plays} times with ${game.TotalUpVotes} upvotes.`
                },
                thumbnail: {
                    url: game.Url
                }
            };
            channel.send({ embed: embed })
                .catch(err => { });
        } else {
            channel.send('Is the Roblox server down? I just connected to Roblox and couldn\'t find and games.')
                .catch(err => { });
        }
    }, host, endpoint, {
        MaxRows: gameSize
    });
}