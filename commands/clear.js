// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running clear command
module.exports = async (bot, msg, args) => {
    var toClear = config.constants.clearHistory;
    var reply = "Just"
    if (args.length >= 2) {
        if (args.length > 2 || isNaN(args[1])) reply = "It's !clear (messages), but I";
        if (!isNaN(args[1])) toClear = parseInt(args[1]);
    }
    toClear = toClear > 99 ? 100 : toClear + 1;
    var clearSize = toClear;
    msg.channel.bulkDelete(toClear, true)
    .then(messages => {
        clearSize = messages.size;
        timeout = { "timeout": 3000 };
        msg.channel.send(`${reply} deleted the last ${clearSize} messages.`)
            .then(msg => msg.delete(timeout));
    })
    .catch(err => {
        msg.channel.send(`Didn't delete any messages, you sure there were messages to delete? I can't delete messages more than 2 weeks old using the clear command.`)
            .then(msg => msg.delete({ "timeout": 3000 }));
        log.error(`${msg.author.tag} ${msg.author} tried to delete messages but I got ${err}`);
    });
    log.info(`${msg.author.tag} ${msg.author} deleted ${clearSize} messages in ${msg.channel}`)
}