const reacts = {
    "yes": "729594115989176332",
    "no": "729594117017042964"
}

// Dependencies
const { MessageEmbed } = require("discord.js");

module.exports = async (reaction, user) => {
    let message = reaction.message;
    let embed = message.embeds[0].toJSON();
    let nextString = embed.fields[2].value;
    if (nextString.includes('no one')) {
        //
    }
    // embed.fields[2].value;
}