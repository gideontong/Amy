const log = require('log4js').getLogger('amy');

module.exports = async (bot, msg, args) => {
    let channels = msg.guild.channels.cache.keyArray(); // Array of GuildChannels
    let string = "";
    for (var i = 0; i < channels.length; i++) {
        string += channels[i].name + " " + channels[i].type + '\n';
    }
    msg.channel.send(string);
}