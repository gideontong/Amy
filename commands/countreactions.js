const log = require('log4js').getLogger('amy');

module.exports = async (bot, msg, args) => {
    let channels = msg.guild.channels.cache.array(); // Array of GuildChannels
    log.info(channels);
    let string = "check log\n";
    for (var i = 0; i < channels.length; i++) {
        string += channels[i].name + " " + channels[i].type + '\n';
    }
    msg.channel.send(string);
}