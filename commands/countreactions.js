const log = require('log4js').getLogger('amy');

module.exports = async (bot, msg, args) => {
    let channels = msg.guild.channels; // Collection
    let channelSnowflakes = channels.array();
    log.info(channels);
    let string = "";
    for (var i = 0; i < channelSnowflakes.length; i++) {
        string += channelSnowflakes[i] + '\n';
    }
    msg.channel.send(string);
}