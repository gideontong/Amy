/**
 * Solve a chemical reaction
 * @param {Client} client Discord server client
 * @param {Message} msg Command
 * @param {Array} args Arguments
 */
module.exports = async (client, msg, args) => {
}

/**
 * Defines a molecule
 * @class
 */
class Molecule {
    constructor(name) {
        this.name = name;
        this.charge = 0;
        this.atoms = new Array();
        this.expression = null;
    }
}

/**
 * Defines an atom
 * @class
 */
class Atom {
    constructor(name) {
        this.name = name;
        this.count = 0;
    }
}

/**
 * Checks whether or not a string has uppercase characters
 * @param {String} string String to test
 * @returns {Boolean} Whether or not it is Upper
 */
function isUpper(string) {
    return /[A-Z]/.test(string);
}

/**
 * Checks whether or not a string has lowercase characters
 * @param {String} string String to test
 * @returns {Boolean} Whether or not it is Lower
 */
function isLower(string) {
    return /[a-z]/.test(string);
}

/**
 * Checks whether or not a string has alphabetic characters
 * @param {String} string String to test
 * @returns {Boolean} Whether or not is Alpha
 */
function isAlpha(string) {
    return /[A-Za-z]/.test(string);
}

/**
 * Checks whether or not it contains invalid characters
 * @param {String} string String to test
 * @returns {Boolean} True if invalid
 */
function isInvalid(string) {
    return /[^A-Za-z0-9\+\-\(\[\)\]]/.test(string);
}

/**
 * Checks whether or not it has an open brace
 * @param {String} string String to test
 * @returns {Boolean} True if valid
 */
function startsOpenBrace(string) {
    return ['[', '('].includes(string.charAt(0))
}

/**
 * Check whether or not string was valid molecule
 * @param {String} string String to test
 * @returns {Boolean} True if valid
 */
function isValidMolecule(string) {
    return (isUpper(string.charAt(0)) || startsOpenBrace(string)) && !isInvalid(string);
}

/**
 * Find atoms in a molecule
 * @param {String} molecule Molecule
 * @param {Set} set Set of atoms
 */
function findAtoms(molecule, set) {
    for (let i = 0; i < molecule.length; i++) {
        let character = molecule.charAt(i);
        if (isUpper(character)) {
            let atom = character;
            for (i++; i < molecule.length; ) {
                if (!isLower(character = molecule.charAt(i))) {
                    i--;
                    break;
                }
                atom += character;
                i++;
            }
            set.add(new Atom(atom));
        }
    }
}

/**
 * Balances a chemical reaction
 * @param {Array} reaction Reaction to solve, split by a delimiter
 * @returns {String} Solved reaction or error string
 */
function solve(reaction) {
    let atoms = new Set(), ions = new Set(), molecules = new Set();
    reaction.forEach(item => {
        if (item.length > 0 && isAlpha(item)) {
            while (!isNaN(item.charAt(0))) item = item.slice(1);
            molecules.add(new Molecule(item));
        }
    });
    if (molecules.size < 2) {
        if (molecules.size == 0) {
            return 'Error: No molecules were found.';
        } else {
            return 'Error: You need at least 2 molecules to form a reaction.';
        }
    }
    molecules.forEach(molecule => {
        if (!isValidMolecule(molecule.name)) {
            return `${molecule.name} was an invalid molecule!`;
        }
        findAtoms(molecule.name, atoms);
    });
    if (molecules.size > atoms.size + 1) {
        return 'Error: There are an infinite number of reactions possible. The equation is potentially a combination of many reactions (try to remove a reagent).';
    }
    let hasIons = false;
    molecules.forEach(molecule => {
    });
}