const doneToken = "����}�";

/**
 * Magic text generators (adapted from LingoJam.com)
 * @class
 */
class MagicText {
    /**
     * Translates some text based on a map
     * @param {String} text Text to translate
     * @param {Object} map Translation map
     * @returns {String} Translated text
     */
    static translate(text, map) {
        if (text == '')
            return '';
        var translatedText = '';
        var sentenceArray = text.split('.');
        for (var i = 0; i < sentenceArray.length; i++) {
            text = sentenceArray[i];
            if (text === '.') {
                translatedText += '.';
                continue;
            }
            if (text.trim() === '') {
                translatedText += text;
                continue;
            }
            var firstLetterIsCapital = false;
            if (text.trim()[0] === text.trim()[0].toUpperCase()) {
                firstLetterIsCapital = true;
            }

            text = MagicText.intrawordSwap(map.intrawords.input, map.intrawords.output, text);
            text = ' ' + text + ' ';
            text = text.toLowerCase();
            text = text.split('\n').join(' 985865568NEWLINETOKEN98758659 ');
            text = MagicText.phraseSwap(map.phrases.input, map.phrases.output, text);
            text = MagicText.wordSwap(map.words.input, map.words.output, text);
            text = MagicText.prefixSwap(map.prefixes.input, map.prefixes.output, text);
            text = MagicText.suffixSwap(map.suffixes.input, map.suffixes.output, text);
            text = MagicText.removeDoneTokens(text);
            text = text.split(doneToken).join('');
            text = text.trim();
            text = MagicText.regexReplace(map.regex.input, map.regex.output, text);
            text = text.split(' 985865568NEWLINETOKEN98758659 ').join('\n');
            text = text.split(' 985865568NEWLINETOKEN98758659').join('\n');
            text = text.split('985865568NEWLINETOKEN98758659').join('\n');
            text = text.replace(/(\b\S+\b)[ ]+\b\1\b/gi, '$1 $1');
            if (firstLetterIsCapital) {
                text = text[0].toUpperCase() + text.substr(1);
            }
            if (i == 0)
                translatedText += text;
            else
                translatedText += ". " + text;
        }
        translatedText = translatedText.split('{{*DUPLICATE MARKER*}}').join('');
        return translatedText;
    }

    /**
     * Swap phrases
     * @param {Array} inputs Phrases to replace
     * @param {Array} outputs Phrases to replace with
     * @param {String} text Text to modify
     * @returns {String} Modified text
     */
    static phraseSwap(inputs, outputs, text) {
        var wordSeps = new Array(" ", ",", ".", "'", "!", ":", "?", "\"", ";", "/", "<", ">", ")", "(", "%", "$");
        var outputs = MagicText.makeArrayClone(outputs);
        for (var i = 0; i < outputs.length; i++) {
            outputs[i] = MagicText.tokenate(outputs[i]);
        }
        for (var i = 0; i < inputs.length; i++) {
            for (var j = 0; j < wordSeps.length; j++) {
                if (outputs[i] !== "")
                    text = text.split(" " + inputs[i].toLowerCase() + wordSeps[j]).join(" " + outputs[i] + wordSeps[j]);
                else
                    text = text.split(" " + inputs[i].toLowerCase() + wordSeps[j]).join(" ");
            }
        }
        return text;
    }

    /**
     * Swaps words
     * @param {Array} inputs Words to swap
     * @param {Array} outputs Words to swap with
     * @param {String} text Text to modify
     * @returns {String} Modified text
     */
    static wordSwap(inputs, outputs, text) {
        var wordSeps = new Array(" ", ",", ".", "'", "!", ":", "?", "\"", ";", "/", "<", ">", ")", "(", "%", "$");
        text = text.replace(/(\b\S+\b)\s+\b\1\b/i, "$1  $1");
        var outputs = MagicText.makeArrayClone(outputs);
        for (var i = 0; i < outputs.length; i++) {
            outputs[i] = MagicText.tokenate(outputs[i]);
        }
        var words1_notags = [];
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i] instanceof Array) {
                words1_notags[i] = [];
                for (var j = 0; j < inputs[i].length; j++) {
                    words1_notags[i][j] = inputs[i][j].replace(/\{\{.*\}\}/g, "");
                }
            } else {
                words1_notags[i] = inputs[i].replace(/\{\{.*\}\}/g, "");
            }
        }
        for (var i = 0; i < words1_notags.length; i++) {
            if (outputs[i] instanceof Array) {
                var l = outputs[i].length;
                var swapWithThis = outputs[i][Math.floor(Math.random() * outputs[i].length)];
            } else {
                var swapWithThis = outputs[i];
            }
            for (var j = 0; j < wordSeps.length; j++) {
                if (words1_notags[i] instanceof Array) {
                    for (var k = 0; k < words1_notags[i].length; k++) {
                        if (swapWithThis.length > 0)
                            text = text.split(" " + words1_notags[i][k].toLowerCase() + wordSeps[j]).join(" " + swapWithThis + wordSeps[j]);
                        else
                            text = text.split(" " + words1_notags[i][k].toLowerCase() + wordSeps[j]).join(" ");
                    }
                } else {
                    if (words1_notags[i][0] + words1_notags[i].slice(-1) == "''" || words1_notags[i][0] + words1_notags[i].slice(-1) == "\"\"") {
                        text = text.split(words1_notags[i].toLowerCase() + wordSeps[j]).join(swapWithThis + wordSeps[j]);
                    } else if (swapWithThis.length > 0)
                        text = text.split(" " + words1_notags[i].toLowerCase() + wordSeps[j]).join(" " + swapWithThis + wordSeps[j]);
                    else
                        text = text.split(" " + inputs[i].toLowerCase() + wordSeps[j]).join(" ");
                }
            }
        }
        return text;
    }

    /**
     * Swaps interior strings
     * @param {Array} inputs Strings to swap
     * @param {Array} outputs Strings to swap with
     * @param {String} text String to swap
     * @returns {String} Swapped string
     */
    static intrawordSwap(inputs, outputs, text) {
        var start = 0;
        var str = "";
        var finalText = "";
        for (var end = 0; end < text.length + 1; end++) {
            str = text.substring(start, end);
            for (var i = 0; i < inputs.length; i++) {
                if (str.indexOf(inputs[i]) !== -1) {
                    finalText += str.replace(inputs[i], outputs[i]);
                    start = end;
                    break;
                }
            }
        }
        finalText += text.substring(start, end);
        text = finalText;
        return text;
    }

    /**
     * String to escape
     * @param {String} regex String to escape
     * @returns {String} Replace string
     */
    static escapeRegex(regex) {
        return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
    }

    static prefixSwap(inputs, outputs, text) {
        var outputs = MagicText.makeArrayClone(outputs);
        for (var i = 0; i < outputs.length; i++) {
            outputs[i] = MagicText.tokenate(outputs[i]);
        }
        for (var i = 0; i < inputs.length; i++) {
            text = text.replace(new RegExp("\\s" + MagicText.escapeRegex(inputs[i]) + "([^\\s])", 'g'), " " + outputs[i] + "$1");
        }
        return text;
    }

    static suffixSwap(inputs, outputs, text) {
        var outputs = MagicText.makeArrayClone(outputs);
        for (var i = 0; i < outputs.length; i++) {
            outputs[i] = MagicText.tokenate(outputs[i]);
        }
        for (var i = 0; i < inputs.length; i++) {
            text = text.replace(new RegExp("([^\\s])" + MagicText.escapeRegex(inputs[i]) + "\\s", 'g'), "$1" + outputs[i] + " ");
        }
        return text;
    }

    static regexReplace(inputs, outputs, text) {
        for (var i = 0; i < inputs.length; i++) {
            if (typeof outputs[0] == 'string' || outputs[0] instanceof String) {
                var match = inputs[i].match(new RegExp('^/(.*?)/([gimy]*)$'));
                if (match) {
                    var properRegEx = new RegExp(match[1], match[2]);
                    text = text.replace(properRegEx, outputs[i]);
                }
            }
        }
        return text;
    }

    /**
     * Removes tokens from string
     * @param {String} text Text to modify
     */
    static removeDoneTokens(text) {
        text = text.split(doneToken).join("");
        return text;
    }

    /**
     * Token an object
     * @param {Array} s Array object
     */
    static tokenate(s) {
        if (Object.prototype.toString.call(s) === '[object Array]') {
            for (var i = 0; i < s.length; i++) {
                s[i] = doneToken + s[i].toString().split("").join(doneToken) + doneToken;
            }
            return s;
        } else {
            return doneToken + s.toString().split("").join(doneToken) + doneToken;
        }
    }

    /**
     * Clones an array
     * @param {Array} existingArray Array to clone
     * @returns {Array} Cloned array
     */
    static makeArrayClone(existingArray) {
        var newObj = (existingArray instanceof Array) ? [] : {};
        for (i in existingArray) {
            if (i == 'clone')
                continue;
            if (existingArray[i] && typeof existingArray[i] == "object") {
                newObj[i] = MagicText.makeArrayClone(existingArray[i]);
            } else {
                newObj[i] = existingArray[i]
            }
        }
        return newObj;
    }
}

module.exports = MagicText;