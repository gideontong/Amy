// Running howold runs accountage
module.exports = async (bot, msg, args) => {
    require('./accountage')(bot, msg, args);
}