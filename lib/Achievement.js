// An implementation of an achievement/stat-tracker system for Amy/Discord
const achievements = require('../config/achievements.json');
const storage = require('node-persist');
await storage.init({ dir: '../data/' });

class Achievement {
    static prepareUser(snowflake) {
    }

    static grantAchievement(snowflake, achievement) {
    }

    static removeAchievement(snowflake, achievement) {
    }

    static toggleAchievement(snowflake, achievement) {
    }

    static getAchievement(snowflake, achievement) {
    }

    static getAllAchievements(snowflake) {
    }

    static getStatistic(snowflake, statistic) {
    }

    static setStatistic(snowflake, statistic, value) {
    }

    // Same as setStatistic except changes the current value by value
    static updateStatistic(snowflake, statistic, value) {
    }

    static getAllStatistics(snowflake) {
    }
}

module.exports = Achievement;