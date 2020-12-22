const map = {
    '?': '⸮',
    '0': '0',
    '1': 'Ɩ',
    '2': 'ς',
    '3': 'Ɛ',
    '4': 'μ',
    '5': 'ट',
    '6': 'მ',
    '7': '٢',
    '8': '8',
    '9': '୧',
    'a': 'ɒ',
    'b': 'd',
    'c': 'ɔ',
    'd': 'b',
    'e': 'ɘ',
    'f': 'ʇ',
    'g': 'ϱ',
    'h': 'ʜ',
    'i': 'i',
    'j': 'į',
    'k': 'ʞ',
    'l': 'l',
    'm': 'm',
    'n': 'n',
    'o': 'o',
    'p': 'q',
    'q': 'p',
    'r': 'ɿ',
    's': 'ƨ',
    't': 'Ɉ',
    'u': 'υ',
    'v': 'v',
    'w': 'w',
    'x': 'x',
    'y': 'γ',
    'z': 'z',
    'A': 'A',
    'B': 'ઘ',
    'C': 'Ɔ',
    'D': 'Ⴇ',
    'E': 'Ǝ',
    'F': 'ᆿ',
    'G': 'Ә',
    'H': 'H',
    'I': 'I',
    'J': 'Ⴑ',
    'K': 'ﻼ',
    'L': '⅃',
    'M': 'M',
    'N': 'И',
    'O': 'O',
    'P': 'Գ',
    'Q': 'Ϙ',
    'R': 'Я',
    'S': 'Ƨ',
    'T': 'T',
    'U': 'U',
    'V': 'V',
    'W': 'W',
    'X': 'X',
    'Y': 'Y',
    'Z': 'Z'
};

const { characterReplace } = require('../lib/MagicText');

/**
 * Mirror text backwards
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    const text = msg.content.substring(args[0].length + 1);
    msg.channel.send(characterReplace(text, map));
}