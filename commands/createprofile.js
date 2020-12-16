const { createProfile } = require('../lib/Member');

/**
 * Creates a profile on the database for the user
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    await createProfile(msg.author.id);
    msg.channel.send(`Created profile with ${msg.author.id}`);
}