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
                writeMessage(msg, messages[i], (i + 1) * 2000);
            } 
            setTimeout(function() {
                msg.delete();
            }, 2000);
        })
}

function writeMessage(msg, text, timeout) {
    setTimeout(() => {
        msg.edit(`> ${text}\nLoading...`);
    }, timeout, text)
}