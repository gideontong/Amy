const gold = 0xFFD700;
const perPage = 7;
const categories = [
    {
        id: "fun",
        name: "Fun",
        description: "It's always fun time! Hehehehe",
        emote: "<:fun:805588634929201165>"
    },
    {
        id: "economy",
        name: "Economy",
        description: "Make money, sell money, stonks go brrrrr?",
        emote: "<:economy:805588636040953916>"
    },
    {
        id: "utility",
        name: "Utility",
        description: "Do useful things. Every once in a while.",
        emote: "<:utility:805588634941128704>"
    },
    {
        id: "achievements",
        name: "Achievements",
        description: "Bragging rights? BRAGGING rights? Yes! Yes! Yes!",
        emote: "<:achievement:805588635025145897>"
    },
    {
        id: "world",
        name: "World",
        description: "Explore the world without getting up from the couch.",
        emote: "<:world:805588635482849310>"
    },
    {
        id: "games",
        name: "Games",
        description: "Beat your friends with fake hammers.",
        emote: "<:games:805588634589462538>"
    },
    {
        id: "internet",
        name: "Internet",
        description: "Use the internet without leaving Discord.",
        emote: "<:internet:805588635256225832>"
    },
    {
        id: "education",
        name: "Education",
        description: "Be a forever learner! Or a forever cheater.",
        emote: "<:education:805588634929201182>"
    },
    {
        id: "text",
        name: "Text",
        description: "Generate cool Minecraft, cursive, or other super fancy texts and fonts!",
        emote: "<:text:805588634248937492>"
    },
    {
        id: "moderation",
        name: "Moderation",
        description: "Keep your community in check, before they get out of hand.",
        emote: "<:moderation:805588633997541426>"
    },
    {
        id: "nsfw",
        name: "NSFW",
        description: "Special commands for premium subscribers. Some of these commands may also require you to set the channel to 18+ only so you can view them.",
        emote: "<:nsfw:805588635239055411>"
    }
];
const names = [
    'fun',
    'economy',
    'utility',
    'achievements',
    'world',
    'games',
    'internet',
    'education',
    'text',
    'moderation',
    'nsfw',
];

const { amy: prefix } = require('../../config/config.json').prefix;
const commands = require('../../config/commands.json');

/**
 * List the commands avilable on the bot
 * @param {Message} msg Message to act
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const embed = processArguments(args);
    msg.channel.send({ embed: embed });
}

/**
 * Process arguments
 * @param {Array} args Arguments
 */
function processArguments(args) {
    if (args.length > 1) {
        if (names.includes(args[1])) {
            if (args.length > 2 && !isNaN(args[2])) {
                return pageListing(parseInt(args[2]), args[1]);
            } else {
                return pageListing(1, args[1]);
            }
        } else if (!isNaN(args[1])) {
            return pageListing(parseInt(args[1]));
        } else {
            return defaultScreen();
        }
    } else {
        return defaultScreen();
    }
}

/**
 * Return default screen
 */
function defaultScreen() {
    var embed = {
        description: 'With hundreds of commands, Amy is one of the more versatile bots!',
        fields: [],
        color: gold,
        footer: {
            text: `Use ${prefix}commands <category> to learn more about a category!`
        }
    };
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        embed.fields.push({
            name: `${category.emote} ${category.name}`,
            value: `\`${category.id}\``,
            inline: true
        });
    }
    return embed;
}

/**
 * Create a page listing
 * @param {Number} page Page
 * @param {String} category Category
 */
function pageListing(page, category = false) {
    const keys = Object.keys(commands)
        .filter(command => !commands[command].flags.hidden)
        .filter(command => !category || commands[command].category == category);
    const begin = (page - 1) * perPage;
    const start = begin < keys.length ? begin : 0;
    const end = start + perPage;
    let description = '';
    for (var i = start; i < (end > keys.length ? keys.length : end); i++) {
        if (commands[keys[i]].flags.hidden) continue;
        description += `**${commands[keys[i]].command}**: ${commands[keys[i]].description}\n`
    }
    const embed = {
        description: description,
        author: {
            name: msg.member.nickname ? msg.member.nickname : msg.client.user.username,
            icon_url: msg.author.displayAvatarURL()
        },
        color: gold,
        footer: {
            text: `Page ${page} of ${Math.ceil(keys.length / perPage)}`
        }
    };
    return embed;
}