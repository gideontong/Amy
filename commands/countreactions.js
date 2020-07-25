/**
 * I am very sorry this function exists. It's supposed to count all the reactions on every message,
 * and then return the stats of how many reactions each user has given, with each individual emoji.
 * It's admin-only due to how slow the function is and the fact that it hits the Discord API so
 * hard.
 * 
 * According to this blog post, messages are stored by ID:
 * https://blog.discord.com/how-discord-stores-billions-of-messages-7fa6ec7ee4c7
 * 
 * and therefore the fastest possible runtime, considering that reactions are tied to an individual
 * message, is O(n). I've tried to shorten the runtime of this function to O(n) by as much as
 * possible, but there's only so much the Discord API allows me to do. Therefore, it does
 * so in a multi-stage process, because the fetch() command does not retrieve cached reactions:
 * 
 * 1. Cache all the messages by snowflake
 * 2. Manually grab the reactions by snowflakes grabbed in 1
 * 3. Count the reactions and store it in a 2D map
 * 4. Return the map
 * 
 * NOTE: I'm also aware that I should've written a wrapper class for all the functions in
 * this file. I might do that in the future, but as it stands currently, all of this code will
 * only be used once, because no other feature is stupid enough to try to read all of the
 * messages in a server at once.
 */

const log = require('log4js').getLogger('amy');

module.exports = async (bot, msg, args) => {
    let channels = msg.guild.channels.cache.array(); // Array of GuildChannels
    let textChannels = [];
    for (var i = 0; i < channels.length; i++) {
        if (channels[i].type == "text") {
            textChannels.push(channels[i]);
        }
    }
    msg.channel.send('Check the log for more details');
    getReactions(channels);
}

// Collect all reactions from all channels
async function getReactions(channels) {
    function logReactions(value, key, map) {
        function logUsers(value, key, map) {
            log.info(`Reaction ${key} was found with ${value}`);
        }
        log.info(`User ${key} was in the map`);
        value.forEach(logUsers);
    }
    let reactions = getMessageReactions(channels[0]);
    (await reactions).forEach(logReactions);
}

// Returns Map of user -> reaction -> count
async function getMessageReactions(channel) {
    log.info(`Now looking at channel #${channel.name} id: ${channel.id}`);
    let reactionCollector = new Map();
    let messages = await readChannelMessages(channel);
    let messageManager = channel.messages;
    for (var i = 0; i < messages.length; i++) {
        let message = await messageManager.fetch(messages[i]);
        let reactions = await message.reactions.cache.array(); // Array of MessageReactions
        for (var j = 0; i < reactions.length; j++) {
            let reactionName = reactions[j].emoji.name;
            let users = reactions[j].users.cache.array(); // Array of Users
            for (var k = 0; k < users.length; k++) {
                countReaction(reactionCollector, users[i], reactionName);
            }
        }
    }
    return reactionCollector;
}

// Counts a reaction and modifies the map in place
function countReaction(reactionCollector, user, reaction) {
    let userCollector = map.has(user) ? map.get(user) : new Map();
    if (userCollector.has(reaction)) {
        userCollector.set(reaction, userCollector.get(reaction) + 1);
    } else {
        userCollector.set(reaction, 1);
    }
    reactionCollector.set(user, userCollector);
}

// Returns array of snowflakes, one for each message in a channel
async function readChannelMessages(channel) {
    let messages = [];
    let messageWindow = await channel.messages.fetch({ limit: 100 });
    let messageWindowKeys = messageWindow.keyArray().sort();
    messages = messages.concat(messageWindowKeys);
    while (messageWindowKeys.length > 99) {
        messageWindow = await channel.messages.fetch({ limit: 100, before: messageWindowKeys[0] });
        messageWindowKeys = messageWindow.keyArray().sort();
        messages = messages.concat(messageWindowKeys);
    }
    return messages;
}