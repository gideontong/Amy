// Imports from local config files
const secrets = require('./config/secrets.json');

// Imports from dependencies
const Discord = require('discord.js');
const log4js = require('log4js');
const client = new Discord.Client();

// Logger setup
log4js.configure({
    appenders: {
        console: {
            type: 'console'
        },
        file: {
            type: 'file',
            filename: `logs/${new Date()}.log`
        }
    },
    categories: {
        default: {
            appenders: ['console', 'file'],
            level: 'info'
        }
    }
});
const log = log4js.getLogger('amy');

// Client setup
require('./event.js')(client);

client.on('ready', () => {
    log.info(`Starting up as ${client.user.tag}`)
    client.user.setActivity('Andrew', { type: 'LISTENING' })
        .then(presence => log.info('Successfully set current presence'))
        .catch(log.error);
    log.info('Bot is now online');
});

client.login(secrets.token);