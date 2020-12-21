const { calculateLevel } = require('./Achievement');
const { getJob, isValidJob, generateMoney } = require('./Economy');
const { getProfile, setJob, addJobTime, updateBalance } = require('./Member');

const undefinedError = 'Something strange happened. Contact the bot author for help!';
const timezoneError = timezone => `Your current timezone is **${timezone}**. To update this, please use the \`timezone\` command.`;

/**
 * Takes care of functions involving member data
 * @class
 */
class MemberLoad {
    /**
     * Get user snowflake
     * @param {String} snowflake Discord user snowflake
     * @param {function} callback Callback if success
     * @returns {String} on failure
     */
    static getLevel(snowflake, callback) {
        if (!snowflake) {
            console.error('MemberLoad.getRank missing arguments, exiting.');
            return undefinedError;
        }
        getProfile(snowflake, function (profile) {
            const [level, xp, progress] = calculateLevel(profile);
            callback(level);
        });
    }

    /**
     * Sets a job with all standard checks
     * @param {String} snowflake Discord user snowflake
     * @param {String} job Job search to set
     * @param {function} callback Callback no matter what, [success, job or message, cooldown?]
     * @returns {String} on failure
     */
    static setJob(snowflake, job, callback) {
        if (!(snowflake && job && callback)) {
            console.error('MemberLoad.setJob is missing arguments!');
            return undefinedError;
        }
        var search;
        if (typeof (job) == 'string') {
            search = job.split(' ').join('').toLowerCase();
        } else if (Array.isArray(job)) {
            search = job.join('').toLowerCase();
        } else {
            return undefinedError;
        }
        const myJob = isValidJob(search);
        if (myJob) {
            const data = getJob(search);
            getProfile(snowflake, function (profile) {
                const [level, xp, progress] = calculateLevel(profile);
                if (level < data.level) {
                    callback([false, "You aren't a high enough level to apply for this job!"]);
                    return;
                } else {
                    if (data.req.enabled) {
                        const precursor = data.req.job;
                        if (profile.statistics.work.hours[precursor] && profile.statistics.work.hours[precursor] >= data.req.hours) {
                            setJob(snowflake, myJob, callback);
                            return;
                        } else {
                            callback([false, `You still need to work at ${precursor} first!`]);
                            return;
                        }
                    } else {
                        setJob(snowflake, myJob, callback);
                        return;
                    }
                }
            });
        } else {
            callback([false, "I can't seem to find that myJob. Maybe try using `myJobs` to see what you qualify for?"]);
        }
    }

    /**
     * Work a job!
     * @param {String} snowflake Work on a job
     * @param {TextChannel} channel Channel to send question to
     * @param {function} callback Callback function, returns amount of money made
     * @returns {String} on failure
     */
    static async workJob(snowflake, channel, callback) {
        if (!(snowflake && channel && callback)) {
            console.error('MemberLoad.workJob is missing arguments!');
            return undefinedError;
        }
        const ceilingOffset = 10;
        const timeToSolve = 30;
        // Check cooldown
        getProfile(snowflake, function (profile) {
            // Check job
            const job = profile.economy.job;
            if (job == 'unemployed') {
                channel.send("You're currently unemployed! If you want to work, try checking out the jobs board with the `jobs` command.");
                return;
            }
            // Check if job can be worked at right now
            const jobData = getJob(job);
            if (!jobData) {
                console.error(`Couldn't find job: ${job}`);
                channel.send(undefinedError);
                return;
            }
            const offsetTime = new Date(new Date().toLocaleString([], { timeZone: profile.timezone }));
            const day = offsetTime.getDay();
            const hour = offsetTime.getHours();
            if (day > 0 && day < 6) {
                if (!jobData.shift.weekdays) {
                    channel.send(`You don't work on the weekdays! What kind of job doesn't work on the weekdays? (Note: ${timezoneError(profile.timezone)})`);
                    return;
                }
            } else {
                if (!jobData.shift.weekends) {
                    channel.send(`You don't work on the weekends! Go outside and go on a date! (Note: ${timezoneError(profile.timezone)})`);
                    return;
                }
            }
            if (jobData.shift.type == 'morning') {
                if (hour < 9 || hour > 12) {
                    channel.send(`Your work hours are 9 AM to noon. Come back later! (Note: ${timezoneError(profile.timezone)})`);
                    return;
                }
            } else if (jobData.shift.type == 'evening') {
                if (hour != 0 && hour < 21) {
                    channel.send(`Your work hours are 9 PM to midnight. A late owl, are ya? (Note: ${timezoneError(profile.timezone)})`);
                    return;
                }
            } else if (jobData.shift.type == 'day') {
                if (hour < 9 || hour > 17) {
                    channel.send(`You have normal work hours from 9 AM to 5 PM. No need to take your work home! (Note: ${timezoneError(profile.timezone)})`);
                    return;
                }
            }
            // Check cooldown
            let cooldown = new Date();
            cooldown.setHours(cooldown.getHours() + 1);
            checkCooldown(snowflake, 'work', function (newCooldown) {
                // Check level
                const [level, xp, progress] = calculateLevel(profile);
                // Use level to generate math question
                const ceiling = level + ceilingOffset;
                const x = Math.floor(Math.random() * ceiling), y = Math.floor(Math.random() * ceiling);
                const xy = x + y;
                const filter = message => message.author.id == snowflake;
                channel.send(`Thanks for working at ${job}. Your current task is to solve this math question: what is **${x} + ${y}**?`)
                    .then(() => {
                        // Update statistics
                        addJobTime(snowflake, job);
                        channel.awaitMessages(filter, { max: 1, time: timeToSolve * 1000, errors: ['time'] })
                            .then(collected => {
                                // Check if answer is correct
                                if (collected.first().content == xy) {
                                    // Update money
                                    const [award, bonus] = generateMoney(job);
                                    updateBalance(snowflake, award);
                                    callback(award, bonus);
                                    return;
                                } else {
                                    channel.send("That wasn't the correct answer. Looks like even though you tried, you failed to do your job this time. Try again next time!");
                                    return;
                                }
                            })
                            .catch(collected => {
                                channel.send(`<@${snowflake}> wasn't able to do his work, and failed to complete his task.`);
                                return;
                            });
                    });
            });
        }, cooldown);
    }
}

module.exports = MemberLoad;