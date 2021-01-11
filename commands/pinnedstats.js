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
        counter.set(author, current ? 1 : current + 1);
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
    // Sort if size is less than 10 due to inefficient algorithm
    if (counter.size < 10) {
        return generateSortedLeaderboard(counter);
    } else {
        const warning = 'More than 10 people on the leaderboard is currently unsupported, so it may look weird.\n\n';
        let description = new String();
        counter.forEach(count, user => {
            description += `${user}: ${count}`;
        });
        return warning + description;
    }
}

/**
 * Generate sorted leaderboard
 * @param {Map} counter Counts of people
 */
function generateSortedLeaderboard(counter) {
    let description = new String();
    while (counter.size > 0) {
        let high = -1, last = null;
        for (const [user, count] of counter.entries()) {
            if (count > high) {
                high = count;
                last = user;
            }
        }
        description += `${last}: ${count}\n`;
        counter.delete(last);
    }
    return description;
}