const { commands } = require('../config/commands.json');

/**
 * List the commands avilable on the bot
 * @param {Client} client Discord server client
 * @param {Message} msg Message to act
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    let description = '';
    for (var i = 0; i < 5; i++) {
        description += `**${commands[i].command}**: ${commands[i].description}\n`
    }
    msg.channel.send(description);
}