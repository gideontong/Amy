const timeout = 180;

const { Chess } = require('chess.js');
const log = require('log4js').getLogger('amy');

/**
 * Play chess
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const mentions = message.mentions.members.size;
    const channel = msg.channel;
    if (mentions == 0) {
        return channel.send('You have to tag someone in the server to play against them!');
    } else if (mentions > 1) {
        return channel.send('You can only tag one person to play against in 2-player chess!');
    }
    const player1 = message.member;
    const player2 = message.mentions.members.first();
    if (player2.user.bot) {
        return channel.send('Playing aginst a bot makes no sense... they don\'t have have the ability to make moves.');
    }
    const chess = new Chess();
    start(channel, player1, player2, chess);
}

/**
 * Start game runtime
 * @param {TextChannel} channel Chess channel
 * @param {GuildMember} player1 White player
 * @param {GuildMember} player2 Black player
 * @param {Chess} chess Game board
 */
function start(channel, player1, player2, chess) {
    var interface = {
        title: '2 Player Chess Game',
        color: 0xF6D887,
        description: '',
        footer: {
            text: 'Say a valid PGN move in chat in the next 3 minutes to use it.'
        }
    };
    turnBegin(channel, player1, player2, chess, interface);
}

/**
 * Beginning of a turn
 * @param {TextChannel} channel Chess channel
 * @param {GuildMember} player1 White player
 * @param {GuildMember} player2 Black player
 * @param {Chess} chess Game board
 * @param {Object} interface UI
 * @param {Boolean} whiteToMove White's turn to move
 */
function turnBegin(channel, player1, player2, chess, interface, whiteToMove = true) {
    interface.description = generateDescription(player1, player2, chess, whiteToMove);
    channel.send({ embed: interface })
        .then(message => {
            const filter = message => {
                if (message.author.id == (whiteToMove ? player1.id : player2.id)) {
                    if (chess.moves().includes(message.content)) {
                        return true;
                    } else {
                        channel.send('You have to provide a valid PGN move!');
                        return false;
                    }
                } else {
                    return false;
                }
            };
            channel.awaitMessage(filter, { max: 1, time: timeout * 1000, errors: ['time'] })
                .then(collected => {
                    const move = collected.first().content;
                    chess.move(move);
                    turnEnd(channel, player1, player2, chess, interface, whiteToMove);
                })
                .catch(err => {
                    if (err instanceof Map) {
                        channel.send('You ran out of time to make a move!');
                    } else {
                        log.error(`Got error while playing chess move: ${err}`);
                    }
                })
        });
}

/**
 * End of the turn
 * @param {TextChannel} channel Chess channel
 * @param {GuildMember} player1 White player
 * @param {GuildMember} player2 Black player
 * @param {Chess} chess Game board
 * @param {Object} interface Chess UI
 * @param {Boolean} whiteToMove White's turn to move
 */
function turnEnd(channel, player1, player2, chess, interface, whiteToMove) {
    if (!chess.game_over()) {
        turnBegin(channel, player1, player2, chess, interface, !whiteToMove);
    } else {
        channel.send(`The game has ended and ${whiteToMove ? player1 : player2} has won the game.`);
    }
}

/**
 * Create description
 * @param {GuildMember} player1 White player
 * @param {GuildMember} player2 Black player
 * @param {Chess} chess Game board
 * @param {Boolean} whiteToMove White's turn to move
 */
function generateDescription(player1, player2, chess, whiteToMove = true) {
    if (whiteToMove) {
        return `${player1}, it's white's turn to move.\n\n\`\`\`${chess.ascii()}\`\`\``;
    } else {
        return `${player2}, it's black's turn to move.\n\n\`\`\`${chess.ascii()}\`\`\``;
    }
}