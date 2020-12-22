const colors = 0xFFFFFF;
const host = 'pubchem.ncbi.nlm.nih.gov';
const endpoint = '/rest/pug_view/data/compound/';
const search = '/rest/pug/compound/fastformula/';

const { authenticatedGet } = require("../lib/Internet");
const { MessageEmbed } = require("discord.js");
const log = require('log4js').getLogger('amy');

/**
 * Gets information about a molecule
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
    if (args.length < 2) {
        msg.channel.send('Search for a molecule like this: `molecule H2O`!');
        return;
    }
    const key = args[1].toUpperCase();
    msg.channel.send(`Now searching for ${key}...`)
        .then(message => {
            authenticatedGet(function (queryData) {
                if ('IdentifierList' in queryData) {
                    if (queryData.IdentifierList.CID && queryData.IdentifierList.CID.length > 0) {
                        authenticatedGet(function (moleculeData) {
                            try {
                                const molecule = moleculeData.Record;
                                const embed = new MessageEmbed()
                                    .addFields(separateFields(molecule.Section))
                                    .setColor(Math.floor(Math.random() * colors))
                                    .setDescription(getDescription(molecule))
                                    .setFooter('Powered by the U.S. National Institute of Health')
                                    .setTitle(`${molecule.RecordTitle}`)
                            } catch (err) {
                                log.error(`While trying to grab molecule ${key} I got ${err}`);
                            }
                        }, host, endpoint + queryData.IdentifierList.CID[0] + '/JSON');
                    } else {
                        message.edit(`Something weird happened while looking for ${key}. It appears we found it, but couldn't load it. File a bug report with \`github\`!`);
                        return;
                    }
                } else if ('Fault' in queryData) {
                    message.edit(`It appears we couldn't find ${key} as a valid molecule structure! Please verify you entered the structure correctly.`);
                    return;
                } else {
                    message.edit(`Something weird happened while looking for a molecule like ${key}! File a bug report with \`github\``);
                    return;
                }
            }, host, search + key + '/cids/JSON');
        });
}

/**
 * Separate chemistry fields into embed fields
 * @param {Array} sections Sections of the chemistry record
 * @returns {Array<EmbedFieldData>} Embeds to add to the embed
 */
function separateFields(sections) {
    let fields = [];
    var identifiers, properties, uses;
    sections.forEach(section => {
        if (section.TOCHeading) {
            if (section.TOCHeading == 'Names and Identifiers') {
                identifiers = section.Section;
            } else if (section.TOCHeading == 'Chemical and Physical Properties') {
                properties = section.Section;
            } else if (section.TOCHeading == 'Use and Manufacturing') {
                uses = section.Section;
            }
        }
    });
    // Names and Identifiers
    if (identifiers) {
        var formula;
        identifiers.Section.forEach(section => {
            if (section.TOCHeading) {
                if (section.TOCHeading == 'Molecular Formula') {
                    formula = section;
                }
            }
        });
        // Molecular Formula
        if (formula) {
            try {
                const field = {
                    name: 'Formula',
                    value: formula.Information[0].Value.StringWithMarkup[0].String,
                    inline: true
                };
                fields.push(field);
            } catch { }
        }
    }
    // Chemical and Physical Properties
    if (properties) {
        var computed, experimental;
        peropties.Section.forEach(section => {
            if (section.TOCHeading) {
                if (section.TOCHeading == 'Computed Properties') {
                    computed = section;
                } else if (section.TOCHeading == 'Experimental Properties') {
                    experimental = section;
                }
            }
        })
        // Computed Properties
        if (computed) {
            function pushComputedProperty(name, data) {
                try {
                    const field = {
                        name: name,
                        value: data.Information.Value.Number[0],
                        inline: true
                    };
                    fields.push(field);
                } catch { }
            }
            var weight;
            computed.Section.forEach(section => {
                if (section.TOCHeading) {
                    if (section.TOCHeading == 'Molecular Weight') {
                        weight = section;
                    } else if (section.TOCHeading == 'Heavy Atom Count') {
                        pushComputedProperty('🎅 Heavy Atoms', section);
                    } else if (section.TOCHeading == 'Formal Charge') {
                        pushComputedProperty('⚛ Formal Charge', section);
                    } else if (section.TOCHeading == 'Covalently-Bonded Unit Count') {
                        pushComputedProperty('⚛ Covalent Structures', section);
                    }
                }
            })
            // Molecular Weight
            if (weight) {
                try {
                    const field = {
                        name: '💺 Molecular Mass',
                        value: `${weight.Information.Value.Number[0]} ${weight.Information.Value.Number.Unit}`,
                        inline: true
                    };
                    fields.push(field);
                } catch { }
            }
        }
        // Experimental Properties
        if (experimental) {
            function pushExperimentalProperty(name, data) {
                try {
                    const field = {
                        name: name,
                        value: data.Information[0].Value.StringWithMarkup[0].String,
                        inline: true
                    };
                    fields.push(field);
                } catch { }
            }
            experimental.Section.forEach(section => {
                if (section.TOCHeading) {
                    if (section.TOCHeading == 'Color/Form') {
                        pushExperimentalProperty('🎨 Color', section);
                    } else if (section.TOCHeading == 'Odor') {
                        pushExperimentalProperty('👃 Smell', section);
                    } else if (section.TOCHeading == 'Taste') {
                        pushExperimentalProperty('🍜 Taste', section);
                    } else if (section.TOCHeading == 'Boiling Point') {
                        pushExperimentalProperty('☕ Boiling Point', section);
                    } else if (section.TOCHeading == 'Melting Point') {
                        pushExperimentalProperty('🧊 Melting Point', section);
                    } else if (section.TOCHeading == 'Solubility') {
                        pushExperimentalProperty('🧋 Solubility', section);
                    } else if (section.TOCHeading == 'Density') {
                        pushExperimentalProperty('📦 Density', section);
                    } else if (section.TOCHeading == 'Refractive Index') {
                        pushExperimentalProperty('🔍 Refraction', section);
                    }
                }
            });
        }
    }
    return fields;
}

/**
 * Get the description of the moolecule
 * @param {Object} record Object containing information about molecule
 * @returns {String} Description
 */
function getDescription(record) {
    const failure = 'Failed to find a description for this molecule.';
    if (record && record.Section) {
        var names;
        record.Section.forEach(section => {
            if (section.TOCHeading == 'Names and Identifiers') {
                names = section.Section;
            }
        });
        if (names) {
            var info;
            names.forEach(section => {
                if (section.TOCHeading == 'Record Description') {
                    info = section.Information;
                }
            });
            if (info) {
                try {
                    return info[0].Value.StringWithMarkup[0].String;
                } catch {
                    return failure;
                }
            }
        }
    }
    return failure;
}