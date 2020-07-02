// Imports from local config files
const permissions = require('../config/permissions.json');

// Easter egg command sudo
module.exports = async (bot, msg, args) => {
    require('./grantachievement')(bot, msg, ['runSudo']);
    if (args.length > 1 && permissions.commands.includes(args[1])) require('./grantachievement')(bot, msg, ['failSudo']);
    msg.channel.send("Hey! I'm a human, not a robot!");
}