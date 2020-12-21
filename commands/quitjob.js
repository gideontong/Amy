const { deleteJob } = require("../lib/Member")

/**
 * Quit your job!
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    deleteJob(snowflake, function() {
        msg.reply('you have quit your job! Hopefully it was for a good cause.');
    });
}