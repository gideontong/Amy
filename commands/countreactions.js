const log = require('log4js').getLogger('amy');

module.exports = async (bot, msg, args) => {
    let channels = msg.guild.channels.cache.array(); // Array of GuildChannels
    let string = "__Quick Response__\n";
    for (var i = 0; i < channels.length; i++) {
        if (channels[i].type == "text") {
            string += channels[i].viewable + ' ' + channels[i].name + '\n';
        }
    }
    msg.channel.send(string);
}