const Discord = require('discord.js');
const log4js = require('log4js');
const client = new Discord.Client();

const secrets = require('./config/secrets.json');
const responses = require('./config/responses.json');

log4js.configure({
    appenders: {
        console: {
            type: 'console'
        },
        file: {
            type: 'file',
            filename: `${new Date()}.log`
        }
    },
    categories: {
        amy: {
            appenders: ['console', 'file'],
            level: 'info'
        }
    }
});
const log = log4js.getLogger('amy');

require('./event.js')(client);

client.on('ready', () => {
    log.info(`Starting up as ${client.user.tag}`)
    client.user.setActivity('Andrew', { type: 'WATCHING' })
        .then(presence => log.info('Successfully set current presence!'))
        .catch(log.error);
    log.info('Bot is now online!');
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