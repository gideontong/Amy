const Discord = require("discord.js");
const client = new Discord.Client();
const secrets = require("./config/secrets.json");
const responses = require("./config/responses.json");

client.on("ready", () => {
    client.user.setActivity('Leo Zhang', { type: 'WATCHING' })
        .then(presence => console.log(`Presence set!`))
        .catch(console.error);
    console.log("Online");
});

kek = responses.delete;

client.on('messageDelete', message => {
    console.log(`Deleted ${new Date()}: ${message.author} said "${message.cleanContent}"`);
    message.reply(kek[Math.floor(Math.random() * kek.length)]);
});

client.on('message', message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().includes('valorant')) {
        if(Math.random() < 0.5) {
            if(Math.random() < 0.9) {
                message.reply("it's time to play Valorant!");
            } else {
                message.reply("it's not time to play Valorant...");
            }
        }
        console.log(`${message.author} mentioned Valorant at ${new Date()}`);
    }
})

client.login(secrets.token);