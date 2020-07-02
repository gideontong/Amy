/**
 * An implementation of an achievement and statistics tracker system for the
 * Discord bot known as Amy
 */

// Imports from local config files
const achievements = require('../config/achievements.json');

// Imports from dependencies
const { registerFont, createCanvas, loadImage } = require('canvas');
const storage = require('node-persist');
storage.init({ dir: './data/' });

class Achievement {
    static async prepareUser(snowflake) {
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

    static async grantAchievement(snowflake, achievement) {
        await Achievement.prepareUser(snowflake);
        let user = await storage.getItem(snowflake);
        user.achievements[achievement] = true;
        await storage.setItem(snowflake, user);
    }

    static async removeAchievement(snowflake, achievement) {
        await Achievement.prepareUser(snowflake);
        let user = await storage.getItem(snowflake);
        if (user.achievements[achievement]) {
            user.achievements[achievement] = false;
        }
        await storage.setItem(snowflake, user);
    }

    static async toggleAchievement(snowflake, achievement) {
        await Achievement.prepareUser(snowflake);
        let user = await storage.getItem(snowflake);
        user.achievements[achievement] = !user.achievements[achievement];
        await storage.setItem(snowflake, user);
    }

    static async getAchievement(snowflake, achievement) {
        let user = await storage.getItem(snowflake);
        if (user.achievements[achievement]) {
            return user.achievements[achievement];
        } else {
            return false;
        }
    }

    // Returns array of achievements obtained
    static async getAllAchievements(snowflake) {
        let user = await storage.getItem(snowflake);
        let obtained = [];
        for (const [achievement, value] of Object.entries(user.achievements)) {
            if (value) obtained.push(achievement);
        }
        return obtained;
    }

    // Returns a Buffer with type image/png
    static async generateAchievementBanner(id, name, secret = false, test = false) {
        registerFont('./assets/minecraft.ttf', { family: 'minecraft' });
        const canvas = createCanvas(320, 64);
        const canvasData = canvas.getContext('2d');
        const bg = await loadImage('./assets/achievement.png');
        canvasData.drawImage(bg, 0, 0);
        var icon;
        if (test) {
            icon = await loadImage(`./assets/test.png`);
        } else {
            icon = await loadImage(`./assets/icons/${id}.png`);
        }
        canvasData.drawImage(icon, 18, 17);
        canvasData.font = '12px minecraft';
        if (secret) {
            canvasData.fillStyle = 'rgb(250, 139, 246)';
            canvasData.fillText('Secret achievement discovered!', 60, 28);
        } else {
            canvasData.fillStyle = 'rgb(255, 255, 0)';
            canvasData.fillText('Achievement get!', 60, 28);
        }
        canvasData.fillStyle = 'rgb(255, 255, 255)';
        canvasData.fillText(name, 60, 50);
        return canvas.toBuffer();
    }

    static async generateAchievementProgress(snowflake) {
        let obtained = await Achievement.getAllAchievements(snowflake);
        let emojiString = '';
        for (var i = 0; i < achievements.public.length; i++) {
            if (obtained.includes(achievements.public[i].id)) {
                emojiString += achievements.public[i].enabledIcon;
            } else {
                emojiString += achievements.public[i].disabledIcon;
            }
        }
        for (var i = 0; i < achievements.secret.length; i++) {
            if (obtained.includes(achievements.secret[i].id)) {
                emojiString += achievements.secret[i].enabledIcon;
            }
        }
    }

    static async getStatistic(snowflake, statistic) {
        let user = await storage.getItem(snowflake);
        return user.statistics[statistic] ? user.statistics[statistic] : 0;
    }

    static async setStatistic(snowflake, statistic, value) {
        let user = await storage.getItem(snowflake);
        user.statistics[statistic] = value;
        await storage.setItem(snowflake, user);
    }

    // Same as setStatistic except changes the current value by value
    static async updateStatistic(snowflake, statistic, value) {
        let currentValue = Achievement.getStatistic(snowflake, statistic);
        let update = currentValue + value;
        Achievement.setStatistic(snowflake, statistic, update);
        return update;
    }

    // Returns dictionary of statistics
    static async getAllStatistics(snowflake) {
        let user = await storage.getItem(snowflake);
        let statistics = {}
        for (const [statistic, value] of Object.entries(user.statistics)) {
            if (value) statistics[statistic] = value;
        }
        return statistics;
    }
}

module.exports = Achievement;