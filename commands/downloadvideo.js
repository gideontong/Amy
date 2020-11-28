const log = require('log4js').getLogger('amy');
const { getInfo } = require('youtube-dl');

/**
 * Downloads an online video and provides a download link
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length != 2) return;
    let url = args[1];
    getInfo(url, [], function (err, data) {
        if (err) {
            msg.channel.send('Something went wrong, call Gideon for help.');
            log.error(`${msg.author.tag} ${msg.author} ran ${msg.content} that threw ${err}`);
            return;
        }

        let description = data.description.length > 1000 ? data.description.substring(0, 1000) + '...' : data.description;
        let descLines = description.split(/\r?\n/);
        if (descLines.length > 5) {
            description = descLines[0];
            for(var i = 1; i < 5; i++) {
                description += '\n' + descLines[i];
            }
        }

        let embed = {
            "embed": {
                "title": data.title,
                "description": `Your download is ready! Click [here](${data.url}) to download your video.\n\n**About your video:**\n${description}...`,
                "url": args[1],
                "author": {
                    "name": "Amy's Video Downloader"
                },
                "thumbnail": {
                    "url": data.thumbnail
                }
            }
        };
        msg.channel.send(embed);
        log.info(`${msg.author.tag} ${msg.author} downloaded video ${url} and got ${data.title}`);
    })
}