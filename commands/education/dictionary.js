// Merriam-Webster and Oxford Dictionary also have official
// APIs, but I don't feel like using them

const host = 'api.dictionaryapi.dev';
const endpoint = '/api/v2/entries/en_US/';
const colors = 0xFFFFFF;

const { authenticatedGet } = require('../../lib/Internet');
const log = require('log4js').getLogger('amy');

/**
 * Get a dictionary definitions
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (msg, args) => {
    const channel = msg.channel;
    if (args.length < 2) {
        return channel.send('You need to provide a word to look up!')
            .catch(err => { });
    }
    let word = args[1];
    if (!(/^[A-Za-z]+$/.test(word))) {
        return channel.send('Your word can be made up of only standard letters!')
            .catch(err => { });
    }
    log.info(`Looking up dictionary word: ${word}`);
    authenticatedGet(function (definitions) {
        if (Array.isArray(definitions) && definitions.length > 0) {
            const definition = definitions[0];
            var title;
            if (definition.word) {
                title = definition.word;
            } else {
                title = 'Unidentifiable word!';
            }
            const fields = definition.meanings.map(d => {
                return {
                    name: d.partOfSpeech,
                    value: d.definitions[0].definition
                };
            });
            const embed = {
                title: `${definition.word ? definition.word : 'error'}: `,
                color: Math.floor(Math.random() * colors),
                fields: fields,
                footer: {
                    text: 'Powered by Google Dictionary and Oxford University Press'
                }
            };
            return channel.send({ embed: embed })
                .catch(err => { });
        } else {
            return channel.send('I am not so sure that was a word...')
                .catch(err => { });
        }
    }, host, endpoint + word);
}