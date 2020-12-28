/**
 * Play rock, paper, scissors
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('You need to tag someone to play rock, paper, scissors with!')
    }
    var game = {
        content: '',
        embed: {
            title: 'Rock, Paper, Scissors Face-Off',
            description: 'Select a reaction. Your choice will be hidden.\n\n[ 🪨 Rock ] [ 📃 Paper ] [ ✂️ Scissors ]',
            color: 3329330
        }
    };
}