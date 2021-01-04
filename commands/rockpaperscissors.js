const timeout = 30;
const options = ['🪨', '📃', '✂️'];
const names = ['Rock', 'Paper', 'Scissors'];

/**
 * Play rock, paper, scissors
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (msg.mentions.users.size < 1) {
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
            options.forEach(move => {
                gameMenu.react(move);
            });
            const moves = new Map(players.map(player => [player, null]));
            const filter = (reaction, user) => options.includes(reaction.emoji.name) && moves.get(user) == null;
            const collector = gameMenu.createReactionCollector(filter, { max: 2, time: timeout * 1000 });
            collector.on('collect', (reaction, user) => {
                moves.set(user, reaction);
            });
            collector.on('end', collected => {
                const embed = generateEndUI(moves);
                msg.channel.send({ embed: embed });
            });
        })
        .catch(err => { });
}

/**
 * Figure out the win condition
 * @param {Map} moves Map of moves
 * @returns {Object} UI of end screen
 */
function generateEndUI(moves) {
    var moveStrings = new Array();
    var moveScores = new Map(players.map(player => [player, 0]));
    // There's a faster algorithm than one that is naive and uses O(n^2), but it
    // doesn't matter that much as long as there aren't a lot of users playing.
    // The overall impact is small. If there is demand for a thousand-user version
    // of rock-paper-scissors, this algorithm could be optimized.
    moves.entries().forEach(([attacker, attack]) => {
        let attackIdx = options.findIndex(attack.emoji.name);
        let name = names[attackIdx];
        moveStrings.push(`${attacker} used ${attack} ${name}!`);
        moves.entries().forEach(([defender, defense]) => {
            let defenseIdx = options.findIndex(defense.emoji.name);
            if (attackIdx + 1 == defenseIdx) {
                moveScores.set(attacker, !moveScores.get(attacker) ? 1 : -1);
                moveScores.set(defender, -1);
            } else if (defenseIdx + 1 == attackIdx) {
                moveScores.set(defender, !moveScores.get(defender) ? 1 : -1);
                moveScores.set(attacker, -1);
            } else if (attackIdx == 0 ^ defenseIdx == 0) {
                if (attackIdx + defenseIdx == options.length - 1) {
                    moveScores.set(attackIdx ? attacker : defender, !moveScores.get(attackIdx ? attacker : defender) ? 1 : -1);
                    moveScores.set(attackIdx ? defender : attacker, -1);
                }
            }
        });
    });
    const description = moveStrings.join('\n') + '\n\n';
    var winner, highScore = 0;
    moveScores.entries().forEach(([player, score]) => {
        if (score >= highScore) {
            winner = player;
            highScore = score;
        }
    });
    if (highScore) {
        description += `The winner was ${winner}!`;
    } else {
        if (winner) {
            description += 'There was a tie between players!';
        } else {
            description += 'There was no winner... you all killed each other.';
        }
    }
    const embed = {
        title: 'Rock Paper Scissors Results',
        color: 0xC70039,
        description: description,
        footer: {
            text: 'Had fun? Share this with your friends!'
        }
    };
    return embed;
}