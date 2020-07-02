// An implementation of an achievement/stat-tracker system for Amy/Discord
const achievements = require('../config/achievements.json');
const storage = require('node-persist');
await storage.init({ dir: '../data/' });

class Achievement {
    static prepareUser() {
    }

    static grantAchievement() {
    }

    static removeAchievement() {
    }

    static toggleAchievement() {
    }

    static getAchievement() {
    }

    static getAllAchievements() {
    }

    static getStatistic() {
    }

    static setStatistic() {
    }

    static updateStatistic() {
    }

    static getAllStatistics() {
    }
}

module.exports = Achievement;