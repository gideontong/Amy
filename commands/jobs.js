const colors = 0xFFFFFF;
const perPage = 7;

const { currency } = require('../config/economy.json');
const { getJobs } = require("../lib/Economy");
const { getLevel } = require("../lib/MemberLoad");
const { MessageEmbed } = require('discord.js');

/**
 * See available jobs to you
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    var page = 1;
    var start = 0;
    let description = '';
    let embed = new MessageEmbed()
    .setColor(Math.floor(Math.random() * colors))
    .setTitle(`${msg.member.nickname ? msg.member.nickname : msg.author.username}'s Available Jobs`);
    getLevel(msg.author.id, function (level) {
        const jobs = getJobs(level);
        if (args.length > 1 && !isNaN(args[1])) {
            let value = parseInt(args[1]);
            let begin = (value - 1) * perPage;
            if (begin < jobs.length && value > 0) {
                page = value;
                start = begin;
            }
        }
        let end = start + perPage;
        for (var i = start; i < (end > jobs.length ? jobs.length : end); i++) {
            description += `**${jobs[i].name}**: Requires level ${jobs[i].level} and pays ${currency}${jobs[i].salary}/Hour\n`;
        }
        embed
            .setDescription('Use `~aboutjob <job name>` to find out more about a job!\n' + description)
            .setFooter(`Page ${page} of ${Math.ceil(jobs.length / perPage)}`);
        msg.channel.send(embed);
    });
}