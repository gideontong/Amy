const { isValidJob } = require("../lib/Economy");
const { setJob } = require("../lib/Member");
const log = require('log4js').getLogger('amy');

/**
 * Sets your current job
 * @param {Client} client Discord server client
 * @param {Message} msg Message
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('You can use this command to get a new job! Simply type `job <job name>`!');
        return;
    }
    args.shift();
    const search = args.join('');
    const job = isValidJob(search);
    if (job) {
        setJob(msg.author.id, job, function ([success, newJob, cooldown]) {
            if (success) {
                msg.reply(`Your new job is ${newJob}! Work begins immediately, so get crackin'!`);
                log.info(`${msg.author.tag} set their job to ${newJob}`);
            } else {
                msg.channel.send('You can only change your job every 12 hours!');
            }
        });
    } else {
        msg.channel.send("I can't seem to find that job. Maybe try using `jobs` to see what jobs you qualify for?");
    }
}