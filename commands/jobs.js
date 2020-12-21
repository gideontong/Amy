const { getJobs } = require("../lib/Economy")

/**
 * See available jobs to you
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    msg.channel.send(getJobs(parseInt(args[1])));
}