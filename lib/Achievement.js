const levelScale = 2.5;

const achievements = require('../config/achievements.json');
const { ranks } = require('../config/profiles.json');
const { registerFont, createCanvas, loadImage } = require('canvas');

/**
 * Generic class for creating cool achievement values
 * @class
 */
class Achievement {
    /**
     * Gets an achievement from the database
     * @param {String} id Achievement ID
     */
    static getAchievement(id) {
        if (achievements.visible.includes(id)) {
            for (const achievement of achievements.public) {
                if (id == achievement.id) {
                    return achievement;
                }
            }
        }
    }

    /**
     * Creates image of new achievement get
     * @param {String} id Achievement ID
     * @param {String} name Achievement name
     * @param {Boolean} secret Is a secret achievement
     * @param {Boolean} test Function testing mode
     * @returns {Buffer} Achievement banner
     */
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

    /**
     * Generates an emoji string with the number of achievements unlocked
     * @param {String} snowflake Discord user snowflake
     * @returns {Array} Emoji string and achievement count
     */
    static async getAchievementProgress(snowflake) {
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

    /**
     * Calculates your current level based on XP
     * @param {Object} profile Profile data
     * @returns {Array} Level, XP, and progress to next level
     */
    static calculateLevel(profile) {
        const messages = profile.statistics.messages;
        const reactions = profile.statistics.reactions;
        const commands = profile.statistics.commands.count;
        const xp = Achievement.calculateLevelProgress(messages, reactions, commands);
        const level = Math.floor(Math.sqrt(xp) / levelScale);
        const xpFloor = Math.pow(level * levelScale, 2);
        const progress = (xp - xpFloor) / (Math.pow((level + 1) * levelScale, 2) - xpFloor);
        return [level, Math.floor(xp), progress];
    }

    /**
     * Calculates an XP gain
     * @param {Number} messages Number of messages sent
     * @param {Number} reactions Number of reactions
     * @param {Number} commands Number of commands executed
     * @returns {Number} XP
     */
    static calculateLevelProgress(messages = 0, reactions = 0, commands = 0) {
        return messages * 0.1 + reactions + commands;
    }

    /**
     * Get a rank name
     * @param {Number} level Current level
     */
    static getRank(level = 0) {
        if (ranks[level]) {
            return [true, ranks[level]];
        } else {
            return [false, 'Unknown Rank'];
        }
    }
}

module.exports = Achievement;