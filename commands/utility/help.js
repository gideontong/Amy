const helpText = "<a:ditto:729440915835322379>";
const helpEmbed = {
    "title": "Need help? Never fear, Amy is here!",
    "description": "**Amy** is your personal assistant and here to save the day.\n\nTo see a full list of commands you can use, type ~commands.\n\n[Amy's Website](https://amyhelps.ml) • [Full Help Screen](https://github.com/gideontong/Amy/blob/master/docs/README.md) • [Donate](https://ko-fi.com/gideontong)",
    "footer": {
        "text": "~help always calls the help command."
    },
    "thumbnail": {
        "url": "http://animaticons.co/wp-content/uploads/animat-image-256x256-color.gif"
    }
};

const { prefix } = require('../../config/config.json');

/**
 * Returns the help screen
 * @param {Client} client Discord client
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    if (args.length > 1) {
        require('./command')(msg, args);
        return;
    }
    const repeat = Math.floor(Math.random() * 5);
    const embed = {
        content: helpText.repeat(repeat),
        embed: helpEmbed
    };
    msg.channel.send(embed);
}