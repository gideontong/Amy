const { colors } = require('../../config/colortable.json');
const { MessageEmbed } = require('discord.js');

/**
 * Gets a color name given a color
 * @param {Message} msg Message
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length < 2) {
        msg.channel.send('Get a color by providing a Hex value! Usage: `color #000000`');
        return;
    }
    const color = getColor(args[1]);
    const embed = new MessageEmbed()
        .addField('Hex Color', `#${color[0]}`, true)
        .addField('Exact Match', `${color[2] ? 'Yes': 'No'}`, true)
        .setColor(color[0])
        .setDescription(getDescription(msg.author.id))
        .setTitle(color[1])
        .setThumbnail(`https://singlecolorimage.com/get/${color[0]}/400x400`);
    msg.channel.send(embed);
}

/**
 * Sometimes returns an ad if the user is non-premium
 * @param {String} snowflake Discord user snowflake
 */
function getDescription(snowflake) {
    // Perfect potential advertising space?
    return '';
}

/**
 * Returns a color name, adapted from ntc js by Chirag Mehta
 * @param {String} color Hex color
 * @returns {Array} Data of color
 */
function getColor(color) {
    color = color.toUpperCase();
    if (color.length < 3 || color.length > 7)
        return ["000000", "Invalid Color: " + color, false];
    if (color.length % 3 == 0)
        color = "#" + color;
    if (color.length == 4)
        color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);

    var rgb = getRGB(color);
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var hsl = getHSL(color);
    var h = hsl[0], s = hsl[1], l = hsl[2];
    var ndf1 = 0; ndf2 = 0; ndf = 0;
    var cl = -1, df = -1;

    for (var i = 0; i < colors.length; i++) {
        if (color == "#" + colors[i][0])
            return [colors[i][0], colors[i][1], true];

        ndf1 = Math.pow(r - colors[i][2], 2) + Math.pow(g - colors[i][3], 2) + Math.pow(b - colors[i][4], 2);
        ndf2 = Math.pow(h - colors[i][5], 2) + Math.pow(s - colors[i][6], 2) + Math.pow(l - colors[i][7], 2);
        ndf = ndf1 + ndf2 * 2;
        if (df < 0 || df > ndf) {
            df = ndf;
            cl = i;
        }
    }

    return (cl < 0 ? ["000000", "Invalid Color: " + color, false] : [colors[cl][0], colors[cl][1], false]);
}

/**
 * Gets HSL values of Hex
 * @param {String} color Hex color
 * @returns {Array[Number]} HSL values of Hex
 */
function getHSL(color) {
    var rgb = [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255];
    var min, max, delta, h, s, l;
    var r = rgb[0], g = rgb[1], b = rgb[2];

    min = Math.min(r, Math.min(g, b));
    max = Math.max(r, Math.max(g, b));
    delta = max - min;
    l = (min + max) / 2;

    s = 0;
    if (l > 0 && l < 1)
        s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

    h = 0;
    if (delta > 0) {
        if (max == r && max != g) h += (g - b) / delta;
        if (max == g && max != b) h += (2 + (b - r) / delta);
        if (max == b && max != r) h += (4 + (r - g) / delta);
        h /= 6;
    }
    return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
}

/**
 * Get RGB values from Hex
 * @param {String} color Hex color
 * @returns {Array<Number>} RGB values
 */
function getRGB(color) {
    return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)), parseInt('0x' + color.substring(5, 7))];
}