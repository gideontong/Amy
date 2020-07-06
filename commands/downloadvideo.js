// Dependencies
const log = require('log4js').getLogger('amy');
const { getInfo } = require('youtube-dl');

// downloadvideo handler
module.exports = async (bot, msg, args) => {
    let url = args[1];
    getInfo(url, [], function(err, data) {
        if(err) {
            msg.channel.send('Something went wrong, call Gideon for help.');
            log.error(`${msg.author.tag} ${msg.author} ran ${msg.content} that threw ${err}`);
            return;
        }
        msg.reply(`Here's the download to **${data.title}**: ${data.url}`);
    })
}