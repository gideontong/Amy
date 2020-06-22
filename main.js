const Discord = require("discord.js");
const client = new Discord.Client();

const secrets = require("./secrets.json");

client.on("ready", () => {
    client.user.setActivity('Leo Zhang', { type: 'WATCHING' })
        .then(presence => console.log(`Presence set!`))
        .catch(console.error);
    console.log("Online");
});

responses = [
    " decided to delete a message. Naughty!",
    " is hiding something again...",
    " is sneaky, but I am sneakier.",
    " is making me a little nervous!",
    " is so fast, even Mank Demer is put to shame.",
    " is so fat, they just ate a whole pizza.",
    " tried to kiss me, but I am bethrothed to Leo.",
    " made me cry.",
    " is gaslighting me.",
    " tried to convince me that I'm stupid.",
    " uses 0% of their brain power.",
    " is such a kindhearted soul, but didn't think first.",
    " is hiding something in their rice cooker.",
    " got too drunk last night."
]

client.on('messageDelete', message => {
    console.log(`Deleted ${new Date()}: ${message.author} said "${message.cleanContent}"`);
    // client.channels.get("CHANNEL_ID").send(`A message saying "${message.cleanContent}" has been deleted at ${new Date()}`)
    message.reply(responses[Math.floor(Math.random() * responses.length)]);
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