const link = 'https://www.bible.com/bible/59/1CO.6.18.ESV';

/**
 * Respond with Bible verse
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async(msg, args) => {
    msg.channel.send(link);
}