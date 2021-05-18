const { prefix } = require('../../config/config.json');
const log = require('log4js').getLogger('amy');
const downloader = require('youtube-dl-exec');

/**
 * Downloads an online video and provides a download link
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;

    if (args.length != 2) {
        return channel.send({
            embed: {
                description: `To download a video, use ${prefix.amy}downloadvideo [URL]`
            }
        });
    }

    let url = args[1];
    try {
        new URL(url);
    } catch (_) {
        return channel.send({
            embed: {
                title: 'Was that a URL?',
                description: 'Please make sure you provide a valid URL to download!'
            }
        });
    }

    downloader(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        youtubeSkipDashManifest: true
    })
        .then(data => {
            if (!data.formats) {
                return channel.send({
                    embed: {
                        title: 'No downloads available...',
                        description: 'We found your video, but couldn\'t find a download link. Sorry!'
                    }
                });
            }

            let description = data.description.length > 1000 ? data.description.substring(0, 1000) + '...' : data.description;
            let descLines = description.split(/\r?\n/);
            if (descLines.length > 5) {
                description = descLines[0];
                for (var i = 1; i < 5; i++) {
                    description += '\n' + descLines[i];
                }
            }

            let embed = {
                title: data.title,
                description: `Your download is ready! Click [here](${data.formats[0].url}) to download your video.\n\n**About your video:**\n${description}...`,
                url: args[1],
                author: {
                    name: "Amy's Video Downloader"
                },
                thumbnail: {
                    url: data.thumbnail
                }
            };
            log.info(`${msg.author.tag} ${msg.author} downloaded video ${url} and got ${data.title}`);
            return channel.send({ embed: embed });
        })
        .catch(err => {
            log.error(`${msg.author.tag} ${msg.author} ran ${msg.content} that threw ${err}`);
            return channel.send({
                embed: {
                    title: 'Error downloading video!',
                    description: 'Something went wrong, try joining the support server to report this error. Does your video exist?'
                }
            });
        });
}