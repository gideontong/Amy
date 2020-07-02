// An implementation of an achievement/stat-tracker system for Amy/Discord
const achievements = require('../config/achievements.json');
const storage = require('node-persist');
await storage.init({ dir: '../data/' });

class Achievement {
    static prepareUser(snowflake) {
        let user = await storage.getItem(snowflake);
        if (user) {
            return;
        } else {
            await storage.setItem(snowflake, {
                achievements: {},
                statistics: {}
            });
        }
    }

    static grantAchievement(snowflake, achievement) {
    }

    static removeAchievement(snowflake, achievement) {
    }

    static toggleAchievement(snowflake, achievement) {
    }

    static getAchievement(snowflake, achievement) {
        let user = await storage.getItem(snowflake);
        if(user[achievement]) {
            return user[achievement];
        } else {
            return false;
        }
    }

    static getAllAchievements(snowflake) {
        let user = await storage.getItem(snowflake);
        let achievements = [];
        for (const [achievement, value] of Object.entries(user.achievements)) {
            if (value) achievements.push(achievement);
        }
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