// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { MessageAttachment } = require('discord.js');
const log = require('log4js').getLogger('amy');

// Handler for running locate command
module.exports = async (client, msg, args) => {
    let searchString = msg.content.substring(args[0].length + 1).toLowerCase();
    function isLeo(string) {
        let search = [
            targets.leo,
            msg.guild.members.fetch(targets.leo).nickname,
            "leo"
        ];
        for (var i = 0; i < search.length; i++) {
            if (string.includes(search[i])) return true;
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