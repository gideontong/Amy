/**
 * Find stats
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const client = msg.client;
    const guilds = client.guilds.cache.size;
    const users = client.users.cache.size;
    const emojis = client.emojis.cache.size;
    const embed = {
        description: 'Currently tracking...',
        color: 4072362,
        fields: [
            {
                name: 'Guilds',
                value: guilds,
                inline: true
            },
            {
                name: 'Users',
                value: users,
                inline: true
            },
            {
                name: 'Emojis',
                value: 'emojis',
                inline: true
            }
        ],
        footer: {
            text: 'AmyBot Statistics'
        }
    };
    channel.send({ embed: embed })
        .catch(err => { });
}