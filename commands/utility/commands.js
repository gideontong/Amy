const gold = 0xFFD700;
const perPage = 7;

const { commands } = require('../../config/commands.json');

/**
 * List the commands avilable on the bot
 * @param {Message} msg Message to act
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    var page = 1;
    var start = 0;
    const keys = Object.keys(commands);
    if (args.length > 1 && !isNaN(args[1])) {
        let value = parseInt(args[1]);
        let begin = (value - 1) * perPage;
        if (begin < keys.length && value > 0) {
            page = value;
            start = begin;
        }
    }
    let description = '';
    let end = start + perPage;
    for (var i = start; i < (end > keys.length ? keys.length : end); i++) {
        if (commmands[keys[i]].flags.hidden) continue;
        description += `**${commands[keys[i]].command}**: ${commands[keys[i]].description}\n`
    }
    const embed = {
        description: description,
        author: {
            name: msg.member.nickname ? msg.member.nickname : msg.client.user.username,
            url: msg.author.displayAvatarURL()
        },
        color: gold,
        footer: {
            text: `Page ${page} of ${Math.ceil(commands.length / perPage)}`
        }
    };
    msg.channel.send({ embed: embed });
}