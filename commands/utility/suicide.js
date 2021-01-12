const colors = 0xFFFFFF;

const { MessageEmbed } = require('discord.js');

/**
 * Alerts if you want to see the suicide message, adapted from Dank Memer
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const embed = new MessageEmbed()
        .addField('You can call the national suicide prevention lifeline.', '+1 (800) 273-TALK (8255)')
        .addField('You can also text the crisis hotline.', 'Text **HELLO** to 741741')
        .addField('If you are not in the United States...', 'Please find your country [on this list](https://www.opencounseling.com/suicide-hotlines) and call your local phone number!')
        .setColor(Math.floor(Math.random() * colors))
        .setImage('https://media.giphy.com/media/M8o1MOwcwsWOmueqN4/giphy.gif')
        .setTitle('We want you to know you are never alone.');
    msg.channel.send(embed);
}