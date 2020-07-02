// Imports from local config files
const config = require('../config/config.json');
const targets = config.targets;

// Imports from dependencies
const { registerFont, createCanvas, loadImage } = require("canvas");
const { MessageAttachment } = require('discord.js');
const log = require('log4js').getLogger('amy');

// Handler for running generateachievement command
module.exports = async (bot, msg, args) => {
    // x = 18
    if (msg.author != targets.gideon) return;
    registerFont('./assets/minecraft.ttf', {family: 'minecraft'});
    const canvas = createCanvas(320, 64);
    const canvasData = canvas.getContext('2d');
    const bg = await loadImage('./assets/achievement.png')
    canvasData.drawImage(bg, 0, 0);
    const icon = await loadImage('./assets/test.png');
    loadImage('./assets/test.png');
    canvasData.drawImage(icon, 18, 17);
    canvasData.font = '12px minecraft';
    canvasData.fillStyle = 'rgb(255, 255, 0)';
    canvasData.fillText('Achievement get!', 60, 28);
    canvasData.fillStyle = 'rgb(255, 255, 255)';
    canvasData.fillText(msg.content.substring(args[0].length + 1), 60, 50);
    const image = new MessageAttachment(canvas.toBuffer());
    msg.channel.send(`Here's your test achievement:`, image);
    log.info(`${msg.author.tag} ${msg.author} generated an achievement`);
}