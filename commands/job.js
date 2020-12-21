const { isValidJob } = require("../lib/Economy");

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
    const search = args.join();
    const job = isValidJob(search);
    if (job) {
        msg.channel.send('Your job has been set to ' + job)
        log.info(`${msg.author.tag} set their job to ${job}`);
    } else {
        msg.channel.send("I can't seem to find that job. Maybe try using `jobs` to see what jobs you qualify for?");
    }
}