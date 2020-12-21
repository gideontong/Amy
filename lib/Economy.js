const { jobs } = require('../config/economy.json');

/**
 * Handle jobs, economic functions, generic and does not touch DB
 * @class
 */
class Economy {
    /**
     * Gets all jobs that qualify based on level
     * @param {Number} level Maximum job level to search for
     * @returns {Array} Jobs that qualify
     */
    static getJobs(level = 0) {
        let myJobs = [];
        console.log(typeof(jobs));
        jobs.values().forEach((job) => {
            if (job.level <= level) {
                myJobs.push(job);
            }
        });
        return myJobs;
    }
}

module.exports = Economy;