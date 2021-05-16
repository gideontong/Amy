const colors = 0xFFFFFF;
const shiftStrings = {
    '24hr': '24-Hour Cycle',
    'morning': '9 AM to Noon',
    'evening': '9 PM to Midnight',
    'day': 'Standard 9-5'
}

const { currency, jobs } = require('../../config/economy.json');
const { MessageEmbed } = require('discord.js');

/**
 * Get information about a job!
 * @param {Message} msg Message
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;

    if (args.length < 2) {
        return channel.send({
            embed: {
                description: 'To get info about a job, use `aboutjob <job name>`!'
            }
        });
    }
    args.shift();
    const search = args.join('').toLowerCase();
    if (search in jobs) {
        const job = jobs[search];
        const embed = new MessageEmbed()
            .addField('Min. Level', job.level, true)
            .addField('Hourly Pay', `${currency}${job.salary}`, true)
            .addField('Qualification', job.req.enabled ? `${job.req.hours} Hrs ${job.req.job}` : 'None', true)
            .addField('Schedule', shiftStrings[job.shift.type], true)
            .addField('Days', `${job.shift.weekends ? 'Sun' : ''}${job.shift.weekdays ? 'MTuWThF' : ''}${job.shift.weekends ? 'Sat' : ''}`, true)
            .addField('Bonuses', `${job.bonus.enabled ? 'Eligible to Earn' : 'Ineligible'}`, true)
            .setColor(Math.floor(Math.random() * colors))
            .setDescription(job.description)
            .setThumbnail(job.image)
            .setTitle(job.name);
        channel.send(embed);
    } else {
        channel.send({
            embed: {
                description: "I couldn't find that job name! Did you spell it correctly?"
            }
        });
    }
}
