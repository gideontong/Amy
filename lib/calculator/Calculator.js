const operators = {
    '+': 0,
    '-': 1,
    '*': 2,
    '/': 3
};

const Denque = require('denque');

class Value {
}

class Function extends Value {
}

class Operator {
    /**
     * Create an operator type
     * @param {Number} type Operator type (0 +, 1 -, 2 *, 3 /)
     */
    constructor(type) {
        if (typeof(type) == 'number') {
            this.type = type;
        } else if (type in operators) {
            this.type = operators[type];
        }
    }
}

/**
 * @class Calculate based on query and strings
 */
class Calculator {
    /**
     * Create a calculator object
     * @param {String} str User query
     * @param {Boolean} parse Auto-parse the input?
     */
    constructor(str, parse = true) {
        this.query = str;
        if (parse) {
            parse();
        }
    }

    /**
     * Parses the user into objects
     */
    parse() {
        var query = new String(this.query);
        this.data = new Denque();
    }
}

module.exports = Calculator;