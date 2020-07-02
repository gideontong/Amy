// Imports from local config files
const secrets = require('./config/secrets.json');
const config = require('./config/config.json');
const activity = config.activity.amy;

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
// const sublog = log4js.getLogger('kevin');

// Client setup
require('./event.js')(client);
require('./kevin/main.js');

client.on('ready', () => {
    log.info(`Starting up as ${client.user.tag}`)
    client.user.setActivity(activity.activity, { type: activity.type })
        .then(presence => log.info(`Successfully set current presence as ${presence.activities[0].type} ${presence.activities.toString()}`))
        .catch(log.error);
    log.info('Discord client is now online');
});

client.login(secrets.token);