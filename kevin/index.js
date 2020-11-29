// Local imports
const { kevin } = require('../config/secrets.json');
const { prefix, activities } = require('../config/config.json');

// Dependency imports
const Discord = require('discord.js');
const log = require('log4js').getLogger('kevin');
const client = new Discord.Client();

// Client setup
require('./event.js')(client);

client.on('ready', () => {
    log.info(`Starting up as ${client.user.tag} with prefix ${prefix.kevin}`);
    setInterval(() => {
        let index = Math.floor(Math.random() * activities.length);
        client.user.setActivity(activities.kevin[index].text, activities.kevin[index].options)
            .catch(log.error);
    }, activities.interval * 1000);
});

client.login(kevin);