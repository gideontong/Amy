module.exports = async (bot, msg, args) => {
    let guild = msg.guild;
    msg.channel.send(guild);
}