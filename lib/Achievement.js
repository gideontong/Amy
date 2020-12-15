// Imports from local config files
const achievements = require('../config/achievements.json');

// Imports from dependencies
const { registerFont, createCanvas, loadImage } = require('canvas');

class Achievement {
    /**
     * Returns a Buffer of an achievement banner
     * @param {str} id Achievement ID
     * @param {str} name Achievement name
     * @param {boolean} secret Is a secret achievement
     * @param {boolean} test Function testing mode
     */
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
        let obtained = []; // FIXME
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