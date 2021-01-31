const icons = {
    valorant: {
        logo: '<:valorant:805543486555684895>',
        icon: 'https://i.imgur.com/7wuos9V.png'
    }
}

const { amy: prefix } = require('../../config/config.json').prefix;

const defaults = {
    error: {
        title: "Is it time to do nothing?",
        description: `It's always time to do nothing. To actually use the command, say\n\`\`\`\n${prefix}timefor <thing to do>\n\`\`\``,
        color: 16711680,
        footer: {
            text: "— Amy"
        }
    },
    valorant: {
        title: "We are Valorant!",
        description: `It's time for ${icons.valorant.logo} Valorant!\n\n**Use your tactics on the battlefield now and party up. It's go time.**`,
        color: 5563637,
        thumbnail: {
            url: icons.valorant.icon
        }
    },
    failure: {
        description: "Get back to work! You should be studying in the dungeon right now, not trying to ask Amy questions! It is ***NOT*** time, only time for professionalism.",
        color: 894306,
        author: {
            name: "Professor Gary",
            icon_url: "https://i.imgur.com/e2VSZ6m.png?1"
        }
    }
};

/**
 * is it time?
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    if (args.length < 2) {
        return channel.send({ embed: defaults.error });
    }
    const roll = Math.random();
    if (args[1].startsWith('valorant') && roll < 0.7) {
        return channel.send({ embed: defaults.valorant });
    } else {
        return channel.send({ embed: defaults.failure });
    }
}