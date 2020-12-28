/**
 * Easter egg
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (msg.content.toLowerCase().includes('make me a sandwich')) {
        msg.channel.send('https://imgs.xkcd.com/comics/sandwich.png');
    } else {
        msg.channel.send(`${msg.author.toString()} is not in the sudoers file. This incident will be reported.`);
    }
}