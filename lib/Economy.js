const { jobs } = require('../config/economy.json');

/**
 * Handle jobs, economic functions, generic and does not touch DB
 * @class
 */
class Economy {
    /**
     * Finds a job
     * @param {String} job Job ID to get
     * @returns {Object} Job data
     */
    static getJob(job = '') {
        const search = job.split(' ').join('').toLowerCase();
        if (search in jobs) {
            return jobs[search];
        } else {
            return null;
        }
    }

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

    /**
     * Decides on how much money to award for a valid job
     * @param {String} job Job name
     * @returns {Array} [Amount made, bonus]
     */
    static generateMoney(job = '') {
        const data = Economy.getJob(job);
        if (data.bonus.enabled) {
            if (Math.random() < data.bonus.chance) {
                const bonus = Math.floor(Math.random() * data.bonus.max);
                return [data.salary + bonus, bonus];
            }
        }
        return [data.salary, false];
    }
}

module.exports = Economy;