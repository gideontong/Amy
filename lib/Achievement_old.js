/**
 * An implementation of an achievement and statistics tracker system for the
 * Discord bot known as Amy
 */

// Imports from local config files
const achievements = require('../config/achievements.json');

// Imports from dependencies
const { registerFont, createCanvas, loadImage } = require('canvas');
const storage = require('node-persist');

class Achievement {
    static async toggleAchievement(snowflake, achievement) {
        await Achievement.prepareUser(snowflake);
        let user = await storage.get(snowflake);
        user.achievements[achievement] = !user.achievements[achievement];
        await storage.set(snowflake, user);
    }

    static async getAchievement(snowflake, achievement) {
        // console.log(`getAchievement called with ${snowflake} and ${achievement}`);
        await Achievement.prepareUser(snowflake);
        let user = await storage.get(snowflake);
        if (user.achievements[achievement]) {
            return user.achievements[achievement];
        } else {
            return false;
        }
    }

    // Returns array of achievements obtained
    static async getAllAchievements(snowflake) {
        // console.log(`getAllAchievements called with ${snowflake}`);
        await Achievement.prepareUser(snowflake);
        let user = await storage.get(snowflake);
        let obtained = [];
        for (const [achievement, value] of Object.entries(user.achievements)) {
            if (value) obtained.push(achievement);
        }
        return obtained;
    }

    // Returns a Buffer with type image/png
    static async generateAchievementBanner(id, name, secret = false, test = false) {
        // console.log(`generateAchievementBanners called with ${snowflake}`);
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
        // console.log(`generateAchievementProgress called with ${snowflake}`);
        let obtained = await Achievement.getAllAchievements(snowflake);
        let emojiString = '';
        let unlocked = 0, secret = 0;
        for (var i = 0; i < achievements.public.length; i++) {
            if (obtained.includes(achievements.public[i].id)) {
                emojiString += achievements.public[i].enabledIcon;
                unlocked++;
            } else {
                emojiString += achievements.public[i].disabledIcon;
            }
        }
        for (var i = 0; i < achievements.secret.length; i++) {
            if (obtained.includes(achievements.secret[i].id)) {
                emojiString += achievements.secret[i].enabledIcon;
                secret++;
            }
        }
        return [emojiString, unlocked, secret];
    }
}

module.exports = Achievement;