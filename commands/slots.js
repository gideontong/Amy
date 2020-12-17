const loading = '<a:loading:788925074052612121>';
const left = '<a:goright:788932776908947466>';
const right = '<a:goleft:788932776875130880>';
const good = ['<a:partycorgi:788925997344358441>'];
const normal = ['🪙', '🎁', '🧧', '✨'];
const bad = ['<a:amongusparty:788925073498177546>', '🪵', '🌿'];
const rolls = 5;
const lowerOdds = 0.4;
const upperOdds = 0.9;
const colors = 0xFFFFFF;
const warnings = [
    '40% of gambling addicts have an anxiety disorder.',
    '50% of gambling addicts have a mood disorder.',
    '60% of gambling addicts have a personality disorder.',
    'Gamble safe and responsibly.',
    'When the fun stops, STOP.',
    'Call 1-800-GAMBLER to get help with a gambling addiction.',
    'Text SUPPORT to 53342 to get help with a gambling addiction.',
    'Your chances of a jackpot are 1 in 100,000.',
    'You must be 18 to gamble in California.',
    'Invest your college tuition into gambling.',
    'If you can gamble for free, it is actually a contest.'
];

const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('amy');

/**
 * Play the slots machine
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    let [current, values] = generateSlots();
    msg.channel.send(generateSlotString(current))
        .then(msg => {
            for (let i = 1; i <= rolls; i++) {
                setTimeout(() => {
                    [current, values] = generateSlots(current, values);
                    msg.edit(generateSlotString(current));
                }, i * 500);
            }
            const embed = new MessageEmbed()
                .setColor(Math.floor(Math.random() * colors))
                .setDescription('you won something text goes here')
                .setFooter(warnings[Math.floor(Math.random() * warnings.length)]);
            setTimeout(() => {
                msg.edit(embed);
            }, (rolls + 1) * 500);
        });
}

/**
 * Generates a slot string
 * @param {Array} current Current slots
 * @returns {String} Slots string
 */
function generateSlotString(current) {
    return `${left} ${current.join(' ')} ${right}`;
}

/**
 * Generates a slots
 * @param {Array} current Current array of rolls
 * @returns {Array} New array of rolls
 */
function generateSlots(current = [], values = Array.from({ length: rolls }).fill(0)) {
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

/**
 * Determines the slots values
 * @param {Array} current The slots values
 * @param {Array} values Values of the function
 * @returns {Array} [Winnings, spoiler string]
 */
function calculateValue(current, values) {
    const slotSet = new Set(current);
    const valueSet = new Set(values);
}