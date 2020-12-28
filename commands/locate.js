const { trolled } = require('../config/snowflakes.json');
const { MessageAttachment } = require('discord.js');

/**
 * Easter egg to respond with a map when Leo is tagged
 * @param {Client} client Discord client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    let searchString = msg.content.substring(args[0].length + 1).toLowerCase();
    function isLeo(string) {
        for (var i = 0; i < trolled.length; i++) {
            if (string.includes(trolled[i])) return true;
        }
        return false;
    }
    if(isLeo(searchString)) {
        var attachment;
        if (args[args.length - 1].includes('superzoom')) attachment = new MessageAttachment('./assets/superzoom.jpg');
        else if (args[args.length - 1].includes('zoom')) attachment = new MessageAttachment('./assets/zoom.jpg');
        else attachment = new MessageAttachment('./assets/map.jpg');
        msg.channel.send(`I've found the current result for Leo's current location... took ${Math.floor(Math.random() * 1000)}ms!`, attachment);
    } else {
        msg.channel.send(`Searching...`)
            .then(msg => setTimeout(function() {
                msg.edit(`Searching... I wasn't able to find this person! Failed after 1 second.`);
            }, 1000));
    }
}