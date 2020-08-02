module.exports = async (bot, msg, args) => {
    msg.channel.send("Help menu coming soon!");
    switch(args[1]) {
        case 'profile':
            break;
        case 'kda':
            break;
        case 'matches':
            break;
        default:
            msg.channel.send("Help menu coming soon!");
            break;
    }
}