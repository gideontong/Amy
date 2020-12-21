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
        Object.values(jobs).forEach((job) => {
            if (job.level <= level) {
                myJobs.push(job);
            }
        });
        return myJobs;
    }

    /**
     * Checks whether or not the job is valid
     * @param {String} job Job name
     * @returns {Boolean} Is the job valid
     */
    static isValidJob(job = '') {
        const search = job.split(' ').join('').toLowerCase();
        if (search in jobs) {
            return jobs[search].name;
        } else {
            return false;
        }
    }
}

module.exports = Economy;