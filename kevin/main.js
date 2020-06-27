// Imports from local config files
const secrets = require('../config/secrets.json');
const config = require('../config/config.json');

// Logger
const Discord = require('discord.js');
const log = require('log4js').getLogger('kevin');
const client = new Discord.Client();

// Client setup
require('./event.js')(client);

client.on('ready', () => {
    log.info(`Starting up as ${client.user.tag}`);
    client.user.setActivity(config.activity.kevin.activity, { type: config.activity.kevin.type })
        .then(presence => log.info(`Successfully set current presence as ${presence}`))
        .catch(log.error);
    log.info('Discord subclient is now online');
});

client.login(secrets.token2);