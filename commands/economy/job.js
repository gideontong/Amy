const { isValidJob } = require('../lib/Economy');
const { setJob } = require('../lib/MemberLoad');
const log = require('log4js').getLogger('amy');

/**
 * Sets your current job
 * @param {Message} msg Message
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length < 2) {
        msg.channel.send('You can use this command to get a new job! Simply type `job <job name>`!');
        return;
    }
    args.shift();
    const search = args.join('');
    const job = isValidJob(search);
    if (job) {
        setJob(msg.author.id, job, function (data) {
            if (data[0]) {
                msg.reply(`Your new job is ${data[1]}! Work begins immediately, so get crackin'!`);
                log.info(`${msg.author.tag} set their job to ${data[1]}`);
            } else {
                msg.channel.send(data[1]);
            }
        });
    } else {
        msg.channel.send("I can't seem to find that job. Maybe try using `jobs` to see what jobs you qualify for?");
    }
}