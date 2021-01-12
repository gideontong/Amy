const { deleteJob } = require("../../lib/Member")

/**
 * Quit your job!
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    deleteJob(msg.author.id, function() {
        msg.reply('you have quit your job! Hopefully it was for a good cause.');
    });
}