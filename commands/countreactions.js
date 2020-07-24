const log = require('log4js').getLogger('amy');

module.exports = async (bot, msg, args) => {
    let channels = msg.guild.channels.cache.array(); // Array of GuildChannels
    let textChannels = [];
    for (var i = 0; i < channels.length; i++) {
        if (channels[i].type == "text") {
            textChannels.push(channels[i]);
        }
    }
    msg.channel.send('Scanning channel: '+ textChannels[0]);
    let array = await readChannel(textChannels[0]);
    msg.channel.send(array);
}

async function readChannel(channel) {
    let messages = [];
    let messageWindow = await channel.messages.fetch({ limit: 100 });
    let messageWindowKeys = messageWindow.keyArray().sort();
    messages.concat(messageWindowKeys);
    while (messageWindowKeys.length > 99) {
        log.info(`Now looking at window ending ${messageWindowKeys[0]}`);
        messageWindow = await channel.messages.fetch({ limit: 100, before: messageWindowKeys[0] });
        messageWindowKeys = messageWindow.keyArray().sort();
        messages.concat(messageWindowKeys);
    }
    return messages.length;
}