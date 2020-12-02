const link = 'https://steamuserimages-a.akamaihd.net/ugc/2442516864332869927/72C8C8C5F8F49D61493ACE61230E2B52A3788DB8/?imw=512&imh=488&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true';

/**
 * Respond with the perhaps cow
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(link);
}