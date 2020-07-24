const log = require('log4js').getLogger('amy');

module.exports = async (bot, msg, args) => {
    let channels = msg.guild.channels.cache.array(); // Array of GuildChannels
    let textChannels = [];
    for (var i = 0; i < channels.length; i++) {
        if (channels[i].type == "text") {
            textChannels.push(channels[i]);
        }
    }
    msg.channel.send(textChannels.length);
    let array = readChannel(textChannels[0]);
    log.info(array);
}

function readChannel(channel) {
    let messages = channel.messages.fetch({ limit: 100 });
    return messages.keyArray();
}