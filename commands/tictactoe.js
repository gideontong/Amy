const timeout = 30;
const colors = [
    0x0A043C,
    0x03406F,
    0xBBBBBB,
    0xFFE3D8
];

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
                            player2 = reply.mentions.members.first();
                            play(msg.channel, player1, player2);
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
        player2 = msg.mentions.members.first();
        play(msg.channel, player1, player2);
    }
}

/**
 * Main game loop
 * @param {TextChannel} channel Channel to play Tic-Tac-Toe in
 * @param {Member} player1 Player 1
 * @param {Member} player2 Player 2
 * @param {Number} size Rows and cols in board
 */
function play(channel, player1, player2, size = 3) {
    if (!player2) return;
    if (player2.user.bot) {
        msg.channel.send('You aren\'t allowed to play against a bot...');
        return;
    }
    var board = new Array(size).fill(null).map(() => new Array(size).fill(null));
    playTurn(channel, player1, player2, board);
}

/**
 * Play out win UI
 * @param {TextChannel} channel Channel to send winner in
 * @param {Member} player Winner member
 * @param {Array} matrix Board
 * @param {Number} color Color index
 */
function winUI(player, matrix, color = 0) {
    const board = generateBoard(matrix);
    const embed = {
        title: `${player.nickname ? player.nickname : player.user.username} has won!`,
        description: `Congratulations ${player}, you have won the ultimate game of tic-tac-toe!\n\n${board}`,
        color: colors[color % colors.length],
        footer: {
            text: 'Ultimate Tic-Tac-Toe'
        }
    };
    channel.send({ embed: embed });
}

/**
 * Play a turn out
 * @param {TextChannel} channel Channel to send turn move in
 * @param {Member} player1 Player 1
 * @param {Member} player2 Player 2
 * @param {Array} matrix Board
 * @param {Boolean} isAttack Is Player 1's turn
 * @param {Number} color Color index
 */
function playTurn(channel, player1, player2, matrix, isAttack = true, color = 0) {
    color++;
    let embed = generateUI(player1, player2, matrix, isAttack, color);
    let win = winExists(matrix);
    if (win) {
        winUI(isAttack ? player2 : player1, win, matrix, color);
        return;
    }
    channel.send({ embed: embed })
        .then(message => {
            const filter = response => {
                if (isAttack) {
                    if (player1.user.id != response.user.id) return false;
                } else {
                    if (player2.user.id != response.user.id) return false;
                }
                const values = response.content.split(' ');
                return values.length == 3 && values[0] == 'move' && !isNaN(values[1]) && !isNaN(values[2]);
            };
            channel.awaitMessages(filter, { max: 1, time: timeout * 1000, errors: ['time'] })
                .then(collected => {
                    const move = collected.first().content.split(' ');
                    const row = parseInt(move[1]) - 1, col = parseInt(move[2]) - 1;
                    if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length && !matrix[row][col]) {
                        matrix[row][col] = isAttack ? 'O' : 'X';
                        playTurn(channel, player1, player2, matrix, !isAttack, color);
                    } else {
                        channel.send(`That move wasn't valid, so you automatically conceded and ${isAttack ? player1 : player2} has won!`);
                    }
                    return;
                })
                .catch(collected => {
                    embed.footer = 'You ran out of time, so the game of tic-tac-toe has ended.';
                    message.edit({ embed: embed });
                });
        })
        .catch(err => { });
}

/**
 * Checks for a winning square in O(n) for arbitrary n=mxm board
 * @param {Array} matrix Board
 * @returns {String} Empty if no winner, otherwise square of winner
 */
function winExists(matrix) {
    let checkCol = matrix[0].slice();
    let leftDiag = true, rightDiag = true;
    for (let row = 0; row < matrix.length; row++) {
        let checkRow = true;
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] != matrix[row][0]) checkRow = false;
            if (matrix[row][col] != checkCol[col]) checkCol[col] = false;
            if (row == col && matrix[row][col] != matrix[0][0]) leftDiag = false;
            if (row == matrix[row].length - 1 - row && matrix[row][col] != matrix[0][matrix[0].length - 1]) rightDiag = false;
        }
        if (checkRow && matrix[row][0] && matrix[row][0].length > 0) {
            return matrix[row][0];
        }
    }
    checkCol.forEach(col => {
        if (col && col.length > 0) {
            return col;
        }
    });
    if (leftDiag) return matrix[0][0];
    else if (rightDiag) return matrix[0][matrix[0].length - 1];
    else return false;
}

/**
 * Generates the MessageEmbed to use
 * @param {Member} player1 Player 1
 * @param {Member} player2 Player 2
 * @param {Array} matrix Board
 * @param {Boolean} isAttack Is player 1's turn
 * @param {Number} color Color index
 * @returns {Object} MessageEmbed 
 */
function generateUI(player1, player2, matrix, isAttack = true, color = 0) {
    const player1Name = player1.nickname ? player1.nickname : player1.user.username;
    const player2Name = player2.nickname ? player2.nickname : player2.user.username;
    const description = `It's ${isAttack ? player1Name : player2Name}'s Turn.\n\nTo move, say \`move <row> <col>\`, for example, \`move 2 2\` marks the center square in a 3x3 grid.`;
    const board = `\`\`\`\n${generateBoard(matrix)}\`\`\``;
    const embed = {
        title: `${player1.nickname ? player1.nickname : player1.user.username} vs. ${player2.nickname ? player2.nickname : player2.user.username}`,
        description: `${description}\n\n${board}`,
        color: colors[color % colors.length],
        footer: {
            text: 'Ultimate Tic-Tac-Toe by Amy'
        }
    };
    return embed;
}

/**
 * Generates a board with a minimum size of 1x3
 * @param {Array} matrix Matrix of moves
 * @returns {String} Board representation
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
    board = board.substring(0, board.length - (board[0].length * 4 - 1));
    return board;
}