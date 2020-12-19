const colors = 0xFFFFFF;

const { currency, jobs } = require('../config/economy.json');
const { MessageEmbed } = require('discord.js');

/**
 * Get information about a job!
 * @param {Client} client Discord server client
 * @param {Message} msg Message
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('To get info about a job, use `aboutjob <job name>`!');
        return;
    }
    args.shift();
    const search = args.join('').toLowerCase();
    if (search in jobs) {
        const job = jobs[search];
        const embed = new MessageEmbed()
            .addField('Min. Level', job.level, true)
            .addField('Hourly Pay', `${currency}${job.salary}`, true)
            .setColor(Math.floor(Math.random() * colors))
            .setDescription(job.description)
            .setThumbnail(job.image)
            .setTitle(job.name);
        msg.channel.send(embed);
    } else {
        msg.channel.send("I couldn't find that job name! Did you spell it correctly?");
    }
}