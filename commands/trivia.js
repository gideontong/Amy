const host = 'opentdb.com';
const endpoint = '/api.php';
const timeout = 30;
const colors = [
    0xC17E9B,
    0xCDAB81,
    0xD8D7B9,
    0x87B191,
    0x7397AA,
    0x6E6B9F
];

/**
 * Play a trivia game singleplayer or multiplayer!
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async(client, msg, args) => {
    let color = 0;
    const embed =  {
        title: "Welcome to Amy's Trivia Game!",
        description: "This game supports both singleplayer and multiplayer. The more people that play, the bigger the prize pool. Compete to win large prizes!\n\nDo you want to play __singleplayer__ or __multiplayer__?\n:bust_in_silhouette: Singleplayer\n:busts_in_silhouette: Multiplayer",
        color: color % colors.length,
        footer: {
          text: `You have ${timeout} seconds to answer.`
        }
      };
    msg.channel.send(embed);
}