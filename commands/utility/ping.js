/**
 * Creates a ping test and sends it to the server
 * @param {Client} client Discord client
 * @param {Message} msg Command
 * @param {Array} args Command arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send('🏓 Pinging...').then((message) => {
        const start = new Date().valueOf();
        const config = require('../../config/config.json');
        const end = new Date().valueOf();
        message.edit({
            content: "🏓 Successfully ponged!",
            embed: {
                title: `📶 ${msg.client.user.username} Service Availability`,
                description: `Currently running on \`discord.us-west.gideontong.com\`. Issues? Contact [Gideon Tong](https://gideontong.com) for help.`,
                fields: [
                    {
                        name: "Server Round Trip Time",
                        value: `${message.createdAt - msg.createdAt}ms`
                    },
                    {
                        name: "Server Connection Time",
                        value: `${msg.client.ws.ping}ms`
                    },
                    {
                        name: "Database Connection Time",
                        value: `${end - start}ms`
                    },
                ],
                footer: {
                    text: `Ping menu generated for ${msg.author.tag}!`
                },
                color: 0x18ffff
            }
        });
    })
}