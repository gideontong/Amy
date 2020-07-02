// Imports from dependencies
const { getAchievementData } = require('../lib/Achievement');
const log = require('log4js').getLogger('amy');

module.exports = async (bot, msg, args) => {
    const data = await getAchievementData(args[1]);
    if (data) {
        const embed = {
            "content": "Want to use your achievement as an emoji? That feature is coming soon! Vote for it on the bugtracker to make it a higher priority.",
            "embed":
            {
                "title": `${data.name}`,
                "description": `${data.description}`,
                "color": 14366683,
                "footer": {
                    "text": `Achievement ${data.id} has been achieved by [coming soon] people.`
                },
                "thumbnail": {
                    "url": `https://amyhelps.ml/images/achievements/${data.id}.png`
                }
            }
        }
        msg.channel.send(embed);
    } else {
        msg.reply(`That's not exactly an achievement...`);
    }
}