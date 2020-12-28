const { getAchievement } = require('../lib/Achievement');

/**
 * Look at an achievement
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length < 2) {
        msg.channel.send('You need to provide me with an achievement!');
        return;
    }
    const data = getAchievement(args[1]);
    if (data) {
        const embed = {
            embed:
            {
                title: data.name,
                description: data.description,
                color: 14366683,
                thumbnail: {
                    url: `https://amyhelps.ml/images/achievements/${data.id}.png`
                },
                footer: 'Like achievements? There are secret ones that you aren\'t allowed to view!'
            },
        };
        msg.channel.send(embed);
    } else {
        msg.reply(`That's not exactly an achievement...`);
    }
}