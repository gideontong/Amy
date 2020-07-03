// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;
const tips = require('../config/loading.json').messages;

// Imports from dependencies
const log = require('log4js').getLogger('amy');
const { selectN } = require('../lib/Today');

// Handler for running loadingscreentips command
module.exports = async (bot, msg, args) => {
    if (args[0].startsWith('!') && msg.author != targets.gideon) return;
    const messages = selectN(tips, 3);
    msg.channel.send(`Loading...`)
        .then(msg => {
            for (var i = 0; i < messages.length; i++) {
                let nextMsg = messages[i];
                (function(nextMsg, timeout) {
                    setTimeout(function() {
                        msg.edit(`> ${nextMsg}\nLoading...`);
                    }, timeout, nextMsg);
                })(messages[i], 2000)
            } 
        })
        .then(msg => msg.delete());
}