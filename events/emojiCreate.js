const { channels: logging, guilds } = require('../config/config.json');

const color = 0xA1E887;

module.exports = async (emoji) => {
    if (!guilds.enabled.includes(emoji.guild.id)) return;

    const client = emoji.client;
    const channels = client.channels;

    emoji.fetchAuthor()
        .then((author) => {
            for (channelID of logging.alerts) {
                channels.fetch(channelID)
                    .then((channel) => {
                        emitAlert(emoji, author, channel);
                    })
                    .catch(_ => { });
            }
        })
        .catch(_ => { });
}

function emitAlert(emoji, author, channel) {
    const embed = {
        title: 'New Emoji Added',
        description: `\`:${emoji.name}:\` was created by ${author} on ${emoji.createdAt}`,
        color: color,
        footer: {
            text: 'Powered by Amy'
        },
        thumbnail: {
            url: emoji.url
        }
    }

    channel.send({ embed: embed })
        .catch(_ => { });
}