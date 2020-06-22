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

client.on('messageDelete', message => {
    console.log(`Deleted ${new Date()}: ${message.author} said "${message.cleanContent}"`);
    message.reply(kek[Math.floor(Math.random() * kek.length)]);
});

client.login(secrets.token);