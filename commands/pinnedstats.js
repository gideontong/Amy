/**
 * Count number of pinned messages
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const pinned = await msg.channel.messages.fetchPinned();
    let counter = new Map();
    pinned.forEach(message => {
        const author = message.author;
        const current = counter.get(author);
        counter.set(author, counter.has(author) ? current + 1 : 1);
    });
    const description = generateLeaderboard(counter);
    const embed = {
        title: 'Pinned Leaderboard',
        description: description,
        color: 15000602,
        timestamp: new Date().toISOString()
    };
    msg.channel.send({ embed: embed });
}

/**
 * Generate leaderboard
 * @param {Map} counter Counts of people
 */
function generateLeaderboard(counter) {
    if (counter.size == 0) {
        return 'There are no pinned messages in this channel.';
    }
    let description = new String();
    counter.forEach((count, user) => {
        description += `${user}: ${count}\n`;
    });
    return description;
}