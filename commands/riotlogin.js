module.exports = async (bot, msg, args) => {
    msg.channel.send("To enable *VALORANT* features, you'll have to sign in with your Riot account first. Check your DMs for more details!");
    msg.author.send("To enable *VALORANT* features, sign in with this link: https://api.riotgames.com/some-login-api")
}