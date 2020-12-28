const timeout = 30;

/**
 * Play 2 player tic tac toe
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    let player1 = msg.member;
    let player2;
    if (msg.mentions.members.size == 0) {
        msg.reply('Who do you want to play tic-tac-toe against?')
            .then(message => {
                const filter = response => {
                    return response.author == msg.author;
                }
                msg.channel.awaitMessages(filter, { max: 1, time: timeout * 1000, errors: ['time'] })
                    .then(collected => {
                        let reply = collected.first();
                        if (reply.mentions.members.size > 0) {
                            player2 = reply.mentions.members.firstKey();
                        } else {
                            msg.channel.send('You are supposed to tag a player to play against them!');
                        }
                    })
                    .catch(collected => {
                        message.edit('You failed to pick a person to play tic-tac-toe against in time! Try again later.');
                    });
            })
            .catch(err => { });
    } else {
        player2 = msg.mentions.members.firstKey();
    }
    if (player2.user.bot) {
        msg.channel.send('You aren\'t allowed to play against a bot...');
        return;
    }
    if (!player2) return;
}

/**
 * Main game loop
 * @param {TextChannel} channel Channel to play Tic-Tac-Toe in
 * @param {Member} player1 Player 1
 * @param {Member} player2 Player 2
 * @param {Number} row Rows in board
 * @param {Number} col Columns in board
 */
function play(channel, player1, player2, row = 3, col = 3) {
    var board = new Array(row).fill(null).map(() => new Array(col).fill(null));
}

/**
 * Generates the MessageEmbed to use
 * @param {Member} player1 Player 1
 * @param {Member} player2 Player 2
 * @param {Array} matrix Board
 * @returns {Object} MessageEmbed 
 */
function generateUI(player1, player2, matrix) {
    const board = `\`\`\`\n${generateBoard(matrix)}\`\`\``;
    const embed = {
        title: `${player1.nickname ? player1.nickname : player1.user.username} vs. ${player2.nickname ? player2.nickname : player2.user.username}`,
        description: board
    };
    return embed;
}

/**
 * Generates a board with a minimum size of 1x3
 * @param {Array} matrix Matrix of moves
 */
function generateBoard(matrix) {
    var board = '';
    matrix.forEach(row => {
        row.forEach(square => {
            board += `${square} | `;
        });
        board = board.substring(0, board.length - 3) + '\n';
        board += '--+' + new Array(row.length - 2).fill('---').join('+') + '+--\n';
    });
    row.length * 4 - 1
    board = board.substring(0, board.length - (row.length * 4 - 1));
    return board;
}