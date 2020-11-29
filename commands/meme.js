const { memes } = require('../config/fun.json');

/**
 * Returns a random meme
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(memes[Math.floor(Math.random() * memes.length)]);
}