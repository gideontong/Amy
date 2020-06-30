// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running annoy command
module.exports = async (bot, msg, args) => {
    var id = msg.author.id;
    if (args.length < 2) {
        msg.reply('imagine not trying to annoy someone else? HAHAHA');
    } else if (args.length > 2) {
        msg.reply('run `!annoy (user)` to annoy them!');
    } else {
        var annoy = (!isNaN(args[1])) ? args[1] : args[1].substring(3, args[1].length - 1);
        // Add something here to annoy the target user
        log.info(`${msg.author.tag} ${msg.author} decided to annoy <@${annoy}>`);
    }
}