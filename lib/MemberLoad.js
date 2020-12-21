const { calculateLevel } = require('./Achievement');
const { getJob, isValidJob } = require('./Economy');
const { getProfile, setJob } = require('./Member');

const undefinedError = 'Something strange happened. Contact the bot author for help!';

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
            console.log('MemberLoad.getRank missing arguments, exiting.');
            return undefinedError;
        }
        getProfile(snowflake, function (profile) {
            const [level, xp, progress] = calculateLevel(profile.statistics.messages, profile.statistics.reactions, profile.statistics.commands.count);
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
            console.log('MemberLoad.setJob is missing arguments!');
            return undefinedError;
        }
        var search;
        if (typeof(job) == 'string') {
            search = job.split(' ').join('').toLowerCase();
        } else if (Array.isArray(job)) {
            search = job.join('').toLowerCase();
        } else {
            return undefinedError;
        }
        const job = isValidJob(search);
        if (job) {
            const data = getJob(job);
            getProfile(snowflake, function (profile) {
                const [level, xp, progress] = calculateLevel(profile.statistics.messages, profile.statistics.reactions, profile.statistics.commands.count);
                if (level < data.level) {
                    callback([false, "You aren't a high enough level to apply for this job!"]);
                    return;
                } else {
                    if (data.req.enabled) {
                        const precursor = data.req.job;
                        if (profile.statistics.work.hours[precursor] && profile.statistics.work.hours[precursor] >= data.req.hours) {
                            setJob(snowflake, job, callback);
                            return;
                        } else {
                            callback([false, `You still need to work at ${precursor} first!`]);
                            return;
                        }
                    } else {
                        setJob(snowflake, job, callback);
                        return;
                    }
                }
            });
        } else {
            callback([false, "I can't seem to find that job. Maybe try using `jobs` to see what you qualify for?"]);
        }
    }
}

module.exports = MemberLoad;