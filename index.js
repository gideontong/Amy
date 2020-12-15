// Local imports
const { amy } = require('./config/secrets.json');
const { prefix, activities } = require('./config/config.json');
const { generateLogName } = require('./lib/MagicNumbers');

// Dependency imports
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
            filename: `logs/${generateLogName()}`
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
require('./kevin/index.js');

client.on('ready', () => {
    log.info(`Starting up as ${client.user.tag} with prefix ${prefix.amy}`);
    setInterval(() => {
        let index = Math.floor(Math.random() * activities.amy.length);
        client.user.setActivity(activities.amy[index].text, activities.amy[index].options)
            .catch(log.error);
    }, activities.interval * 1000);
});

client.login(amy);