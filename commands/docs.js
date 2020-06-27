// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running website command
module.exports = async (bot, msg, args) => {
    msg.channel.send(`https://www.github.com/gideontong/Amy/tree/master/docs`);
    log.info(`${msg.author.tag} ${msg.author} requested the documentation`);
}