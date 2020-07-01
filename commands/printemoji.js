// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for running printemoji command
module.exports = async (bot, msg, args) => {
    if (msg.author != targets.gdeon && msg.author != targets.amy) return;
    msg.channel.send(`<:${args[1]}:${args[2]}>`);
    log.info(`${msg.author.tag} ${msg.author} told me to repeat ${args[1]}`);
}