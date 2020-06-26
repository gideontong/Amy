// Imports from local config files
const config = require('../config/config.json');
const message = require('../events/message');

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running clear command
module.exports = async(bot, msg, args) => {
    var toClear = config.constants.clearHistory;
    var reply = "Just"
    if (args >= 2 && !isNaN(args[1])) toClear = parseInt(args[1]);
    msg.channel.bulkDelete(toClear).then(() => {
        tiemout = { "timeout": 3000 };
        msg.channel.send(`${reply} deleted the last ${toClear} messages.`)
            .then(msg => msg.delete(timeout));
    });
    log.info(`${msg.author.tag} ${msg.author} deleted some messages in ${msg.channel}`)
}