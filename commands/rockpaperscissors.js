const timeout = 30;
const moves = ['🪨', '📃', '✂️'];

/**
 * Play rock, paper, scissors
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (msg.mentions.users.size > 0) {
        msg.channel.send('You need to tag someone to play rock, paper, scissors with!');
        return;
    }
    const players = [msg.author, msg.mentions.users.first()];
    if (players[1].bot) {
        msg.channel.send('You can\'t challenge a bot to rock, paper, scissors.');
        return;
    }
    if (!msg.guild.me.hasPermission('MANAGE_MESSAGES')) {
        msg.channel.send('Warning! I can\'t delete reactions, so your move won\'t be private.');
    }
    var game = {
        title: 'Rock, Paper, Scissors Face-Off',
        description: 'Select a reaction. Your choice will be hidden.\n\n[ 🪨 Rock ] [ 📃 Paper ] [ ✂️ Scissors ]',
        color: 3329330,
        footer: {
            text: `You have ${timeout} seconds to pick a selection!`
        }
    };
    msg.channel.send({ embed: game })
        .then(gameMenu => {
            moves.forEach(move => {
                gameMenu.react(move);
            });
            const filter = (reaction, user) => moves.includes(reaction.emoji.name) && players.includes(user);
            const collector = gameMenu.createReactionCollector(filter, { time: timeout * 1000 });
            collector.on('collect', reaction => {
                // TODO
            });
            collector.on('end', collected => {
                // TODO
            });
        })
        .catch(err => { });
}