/**
 * Creates a ping test and sends it to the server
 * @param {Client} client Discord client
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send('🏓 Pinging...').then((message) => {
        const start = new Date().valueOf();
        const config = require('../config/config.json');
        const end = new Date().valueOf();
        message.edit({
            content: "🏓 Successfully ponged!",
            embed: {
                title: `📶 ${client.user.username} Service Availability`,
                description: `Currently running on \`us-west-01.gid.network/discord\`. Issues? Contact [Gideon Tong](https://gideontong.com) for help.`,
                fields: [
                    {
                        name: "Server Round Trip Time",
                        value: `${message.createdAt - msg.createdAt}ms`
                    },
                    {
                        name: "Server Connection Time",
                        value: `${client.ws.ping}ms`
                    },
                    {
                        name: "Database Connection Time",
                        value: `${end - start}ms`
                    },
                ],
                footer: {
                    text: `Currently serving ${client.users.cache.size} users!`
                },
                color: 0x18ffff
            }
        });
    })
}