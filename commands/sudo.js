// Easter egg
module.exports = async (bot, msg, args) => {
    require('./grantachievement')(bot, msg, ['', 'runSudo']);
    msg.channel.send("Hey! I'm a human, not a robot!");
}