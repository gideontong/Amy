const map = ["\u1511",
    "\u0296",
    "\u14f5",
    "\u21b8",
    "\u14b7",
    "\u2393",
    "\u22a3",
    "\u2351",
    "\u254e",
    "\u22ee",
    "\ua58c",
    "\ua58e",
    "\u14b2",
    "\u30ea",
    "\ud835\ude79",
    "!\u00a1",
    "\u1451",
    "\u2237",
    "\u14ed",
    "\u2138 \u0323 ",
    "\u268d",
    "\u234a",
    "\u2234",
    " \u0307\/",
    "\\|\\|",
    "\u2a05"
];

const log = require('log4js').getLogger('amy');

/**
 * An implementation of the standard galactic alphabet
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    if (args.length < 2) {
        msg.channel.send('You need to give me something to translate!');
        return;
    }
    const string = msg.cleanContent.substr(args[0].length + 1).toLowerCase();
    let result = '';
    string.split('').forEach(letter => {
        const code = letter.charCodeAt(0);
        if (0x61 <= code && code <= 0x7A) {
            result += map[code - 0x61];
        } else {
            result += letter;
        }
    });
    msg.channel.send(result)
        .catch(err => log.error(`Something weird happened in text conversion and I got ${err}`));
}