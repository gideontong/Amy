const embed = {
    "title": "Support AmyBot Development on Patreon!",
    "description": "Hi! My name is Gideon Tong (you can click my name above to see a little about me), but I'm a college student just trying to put myself through college.\n\nIf you could support AmyBot with just a few dollars a month, you help me pay for college and in return I'll give you access to a ton of cool features, like:\n\n• Educational commands! Get help with chemistry, programming, statistics, and more.\n• The stock market: live, real-time data all at your fingertips.\n• Fast cooldowns (just a few seconds or less).\n• Top-secret supporter-only features. :wink:\n\n[Just click the link above to go to my Patreon, or click here.](https://patreon.com/gideontong)",
    "url": "https://patreon.com/gideontong",
    "color": 16742399,
    "author": {
        "name": "Gideon Tong",
        "url": "https://gideontong.com",
        "icon_url": "https://gideontong.com/static/img/icons/favicon-32x32.png"
    },
    "footer": {
        "text": "💛 Thank you! I appreciate it so much."
    },
    "thumbnail": {
        "url": "https://img.icons8.com/color/48/000000/patreon.png"
    }
};

/**
 * Premium information
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    msg.channel.send({ embed: embed });
}