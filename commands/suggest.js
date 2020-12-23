const colors = 0xFFFFFF;

const { MessageEmbed } = require('discord.js');

/**
 * Automatically suggest a command
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('You need to suggest something! Try `suggest tutorial` if you want to learn how.');
        return;
    } else if (args[1].toLowerCase() == 'tutorial') {
        const embed = new MessageEmbed()
            .addField('Step 1', 'Create a GitHub account. You can visit the website by [clicking here](https://github.com).')
            .addField('Step 2', 'Check out the code for [Amy](https://github.com/gideontong/Amy). If you like it, give it a star.')
            .addField('Step 3', 'Under the **Issues** tab, you can create a new issue. Alternatively, type `suggest <your suggestion>` and I will generate a link for you to submit it! Easy!')
            .setColor(Math.floor(Math.random() * colors))
            .setDescription('File a new feature suggestion in 3 easy steps!')
            .setTitle('Feature Suggestion Tutorial');
        msg.channel.send(embed);
        return;
    } else {
        const suggestion = msg.substring(args[0].length + 1);
        const url = new URL('https://github.com/gideontong/Amy/issues/new');
        url.searchParams.append('body', suggestion);
        const embed = new MessageEmbed()
            .addField('Your Suggestion', suggestion)
            .addField('Submission Link', `[Click here to submit your suggestion!](${url.toString()})`)
            .setColor(Math.floor(Math.random() * colors))
            .setDescription('A GitHub account is required. If you need a tutorial, please enter the command `suggest tutorial`!')
            .setTitle('Submission Box');
        msg.channel.send(embed);
    }
}