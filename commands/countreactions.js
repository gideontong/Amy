const log = require('log4js').getLogger('amy');

module.exports = async (bot, msg, args) => {
    let channels = Array.from(msg.guild.channels.cache.keys()); // Array of GuildChannels
    log.info(channels);
    msg.channel.send("check log");
}