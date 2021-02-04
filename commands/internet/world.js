/**
 * See a random photo of the world
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    const seed = args.length > 1 ? encodeURIComponent(args[1]) : Math.random();
    channel.send(`https://picsum.photos/seed/${seed}/600/400`);
}