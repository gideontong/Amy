const helpText = "<a:help:422704174300397579>";
const helpEmbed = {
    "title": "Need help? Never fear, Amy is here!",
    "description": "**Amy** is your personal assistant and here to save the day.\n\nTo see a full list of commands you can use, [click here](https://github.com/gideontong/Amy/blob/master/docs/usage/README.md).\n<a:achievements:421523341879410698> To see your achievements, use the command `!achievements`.\n\n[Amy's Website](https://amyhelps.ml) • [Full Help Screen](https://github.com/gideontong/Amy/blob/master/docs/README.md) • [Donate](https://ko-fi.com/gideontong)",
    "footer": {
        "text": "!help always calls the help command."
    },
    "thumbnail": {
        "url": "http://animaticons.co/wp-content/uploads/animat-image-256x256-color.gif"
    }
};

// Imports from dependencies
const log = require('log4js').getLogger('amy');

// Handler for help command
module.exports = async (bot, msg, args) => {
    let repeat = Math.floor(Math.random() * 10);
    let embed = {
        "content": helpText.repeat(repeat),
        "embed": helpEmbed
    };
    msg.channel.send(embed);
    log.info(`${msg.author.tag} ${msg.author} requested the help page`);
}