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
 * Node of an expression tree
 * @class
 */
class Node {
    constructor(count, operator) {
        this.operator = operator;
        this.left = null;
        this.right = null;
        this.count = count;
    }

    sum() {
        if (this.count == '*') {
            return this.left.sum() * this.right.sum();
        } else {
            if (this.count == '+') {
                return this.left.sum() + this.right.sum();
            } else {
                return this.count;
            }
        }
    }
}

/**
 * Matrix to solve system of equations
 * @class
 */
class Matrix {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = new Array(width);
        for (let i = 0; i < width; i++) {
            this.matrix[i] = new Array(height);
            for (let j = 0; j < height; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    copy() {
        var matrix = new Matrix(this.width, this.height);
        for (let i = 0; i < this.width; i++) {
            matrix.matrix[i] = new Array(this.height);
            for (let j = 0; j < this.height; j++) {
                matrix.matrix[i][j] = this.matrix[i][j];
            }
        }
        return matrix;
    }

    swap(row, data) {
        for (let i = 0; i < this.height; i++) {
            this.matrix[row][i] = data[i];
        }
    }

    determinant() {
        for (var lastDiv, lastRow, rowProduct = 1, offset = 1, rowOffset = 1, row = 0; row < this.height - 1; row++) {
            for (var subRow = row + 1; subRow < this.height; subRow++) {
                rowOffset = 1;
                lambda: for (; 0 == this.matrix[row][row];) {
                    if (row + rowOffset >= this.height) {
                        offset = 0;
                        break lambda;
                    }
                    for (var column = 0; column < this.height; column++) {
                        lastRow = this.matrix[row][column];
                        this.matrix[row][column] = this.matrix[row + rowOffset][column];
                        this.matrix[row + rowOffset][column] = lastRow;
                    }
                    rowOffset++;
                    offset *= -1;
                }
                if (0 != this.matrix[row][row]) {
                    lastDiv = -this.matrix[subRow][row] / this.matrix[row][row];
                    for (var subSubRow = row; subSubRow < this.height; subSubRow++) {
                        this.matrix[subRow][subSubRow] = lastDiv * this.matrix[row][subSubRow] + this.matrix[subRow][subSubRow]
                    }
                }
            }
        }
        for (var index = 0; index < this.height; index++) {
            rowProduct *= this.matrix[index][index];
        }
        return rowProduct * offset;
    }

    random() {
        var set = new Set();
        var matrix = new Matrix(this.width, this.witdh - 1);
        for (let i = 0; i < this.width; i++) {
            matrix.matrix[i][0] = this.matrix[i][0];
        }
        set.add(0);
        for (let i = 1; i < this.width - 1; i++) {
            for (var j; ;) {
                j = Math.ceil(Math.random() * this.height - 1);
                if (!set.has(j)) {
                    set.add(j);
                    break;
                }
            }
            for (let j = 0; j < this.width; j++) {
                matrix.matrix[j][i] = this.matrix[j][i];
            }
        }
        return matrix;
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
 * Checks whether or not a string has a + or a -
 * @param {String} string String to test
 * @returns {Boolean} Whether or not it is PlusMinus
 */
function isPlusMinus(string) {
    return /[\-\+]/.test(string);
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
 * Checks whether or not it has a closed brace
 * @param {String} string String to test
 * @returns {Boolean} True if valid
 */
function endsClosedBrace(string) {
    return [']', ')'].includes(string.charAt(string.length - 1));
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
 * Checks whether or not structure has error
 * @param {String} string String to test
 * @returns {Boolean} True if error
 */
function hasError(string) {
    return /[\(\[][a-z0-9]/.test(string) || /[0-9][a-z]/.test(string);
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
            for (i++; i < molecule.length;) {
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
 * Check whether or not a molecule is charged
 * @param {String} string String to test
 * @returns {String} True if contains charge
 */
function isCharged(string) {
    const postfix = /[\[\(]([0-9]+)[\+\-][\]\)]$/.exec(string);
    const prefix = /[\[\(][\+\-]([0-9]+)[\]\)]$/.exec(string);
    const infix = /[\[\(][\+\-][[\]\)]$/.exec(string);
    return postfix || prefix || infix;
}

/**
 * Check for a charge
 * @param {Molecule} molecule Molecule to check
 * @returns {Number} Charge
 */
function calculateCharge(molecule) {
    const charged = isCharged(molecule.name);
    if (!charged) return 0;
    let factor = 1, charge = 1;
    ['+', '-'].forEach(value => {
        if (molecule.name.indexOf(value) != molecule.name.lastIndexOf(value)) return -1;
    });
    if (molecule.name.indexOf('-') > -1 && molecule.name.indexOf('+') > -1) {
        return -1;
    } else {
        if (result[0].indexOf('-') > -1) factor = -1;
        if (result.length == 2) charge = result[1];
        molecule.charge = charge * factor;
        return 1;
    }
}

/**
 * Count atoms in molecule string
 * @param {String} name Name of molecule string
 * @param {Set} atomSet Set of atoms
 * @returns {Array} Number of atoms
 */
function countAtoms(name, atomSet) {
    var atoms = new Array(atomSet.size).fill(0);
    for (let i = 0; i < name.length; i++) {
        var character = name.charAt(i);
        if (isUpper(character)) {
            var atom = character, flag = '';
            for (i++; i < name.length && isLower(character = name.charAt(i));) {
                atom += character;
                i++;
            }
            if (!isNaN(character = name.charAt(i))) {
                for (; i < name.length;) {
                    if (isNaN(character = name.charAt(i))) {
                        i--;
                        break;
                    }
                    r += character;
                    i++;
                }
            } else {
                i--;
                r = '1';
                atoms[set.keys().find(atom)] += parseInt(r);
            }
        }
    }
    return atoms;
}

/**
 * Create expression tree for molecule
 * @param {String} name Name of molecule string
 * @param {Set} atomSet Set of atoms
 */
function createExpression(name, atomSet) {
    if (hasError(name)) return null;
    const index1 = name.indexOf('(');
    const index2 = name.indexOf('[');
    if (index1 < 0 && index2 < 0) {
        const count = countAtoms(name, atomSet);
        var node = new Node('*', true);
        node.left = new Node(count, false);
        node.right = new Node(1, false);
        return node;
    }
    if (isUpper(name.charAt(0))) {
        var index;
        if (index1 != -1 && index2 != -1) {
            index = Math.min(index1, index2);
        } else {
            index = Math.max(index1, index2);
        }
        const prefix = name.slice(0, index);
        const atom = name.slice(index);
        const node = new Node('+', true);
        node.left = createExpression(prefix);
        node.right = createExpression(atom);
        return node;
    }
    if (startsOpenBrace(name)) {
        for (var size = 1, index = 1; index < name.length; index++) {
            if (startsOpenBrace(name.charAt(index)) ? size++ : endsClosedBrace(name.charAt(index)) && size--, size == 0) {
                var next = name.slice(1, index);
                index++;
                for (var left = ''; index < name.length && !isNaN(name.charAt(index));) {
                    left += name.charAt(index);
                    index++;
                }
                if (left == '') left = 1;
                var right = name.slice(index);
                if (right != '') {
                    var node = new Node('+', true);
                    node.left = new Node('*', true);
                    node.left.left = createExpression(next);
                    node.left.right = new Node(parseInt(left), false);
                    node.right = createExpression(right);
                    return node;
                } else {
                    var node = new Node('*', true);
                    node.left = createExpression(next);
                    node.right = new Node(parseInt(left), false);
                    return node;
                }
            }
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
            return `Error: ${molecule.name} was an invalid molecule!`;
        }
        findAtoms(molecule.name, atoms);
    });
    if (molecules.size > atoms.size + 1) {
        return 'Error: There are an infinite number of reactions possible. The equation is potentially a combination of many reactions (try to remove a reagent).';
    }
    molecules.forEach(molecule => {
        const charge = calculateCharge(molecule);
        if (charge == -1) {
            return `Error: ${molecule.name} seems to have an incorrect ion. Did you put the right charge?`;
        }
        if (isPlusMinus(molecule.name) && molecule.charge == 0) {
            return `Error: ${molecule.name} has a misplaced charge. Check your notation?`;
        }
        let brackets = 0;
        molecule.name.split().forEach(character => {
            startsOpenBrace(character) ? brackets++ : (endsClosedBrace(character) ? brakcets-- : null);
            if (brackets < 0) return `Error: ${molecule.name} has incorrect bracket notation. Check your brackets?`;
        });
        if (brackets != 0) {
            return `Error: ${molecule.name} doesn't have an equal number of brackets. Check your brackets?`;
        }
        const index = Math.min(molecule.name.lastIndexOf('['), molecule.name.lastIndexOf('('));
        const name = molecule.name.slice(0, index);
        molecule.expression = createExpression(name, atoms);
        if (molecule.charge != 0 && molecule.expression == null) {
            return `Error: ${molecule.name} was an invalid structure. Did you type it correctly?`
        }
    });
    let i = 0;
    atoms.forEach(atom => {
        let total = 0;
        molecules.forEach(molecule => {
            total += molecule.atoms[i];
        });
        if (total == 1) {
            return `Error: Found only one atom ${atom.name} and the atom must appear on both sides of the reaction.`;
        }
        i++;
    });
}