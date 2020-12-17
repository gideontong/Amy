const loading = '<a:loading:788925074052612121>';
const good = ['<a:partycorgi:788925997344358441>'];
const normal = ['🪙', '🎁', '🧧', '✨'];
const bad = ['<a:amongusparty:788925073498177546>', '🪵', '🌿'];
const rolls = 5;
const lowerOdds = 0.4;
const upperOdds = 0.9;

/**
 * Play the slots machine
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    let [current, values] = generateSlotString();
    msg.channel.send(current.join(' '))
        .then(msg => {
            for (let i = 1; i <= 5; i++) {
                setTimeout(() => {
                    [current, values] = generateSlotString(current, values);
                    msg.edit(current.join(' '));
                }, i * 500);
            }
        });
}

/**
 * Generates a slots
 * @param {Array} current Current array of rolls
 * @returns {Array} New array of rolls
 */
function generateSlotString(current = [], values = Array.from({ length: rolls }.fill(0))) {
    if (current.length) {
        const idx = current.indexOf(loading);
        if (idx == -1) {
            return [current, values];
        } else {
            const rand = Math.random();
            let pick;
            if (rand < lowerOdds) {
                pick = bad[Math.floor(Math.random() * bad.length)];
                values[idx] = -1;
            } else if (rand < upperOdds) {
                pick = normal[Math.floor(Math.random() * normal.length)];
                values[idx] = 1;
            } else {
                pick = good[Math.floor(Math.random() * good.length)];
                values[idx] = 2;
            }
            current[idx] = pick;
            return [current, values];
        }
    } else {
        return [Array.from({
            length: rolls
        }).fill(loading), values];
    }
};