const operators = ['+', '-', '*', '/'];

const functions = {
    '^': {
        before: 1,
        after: 1,
        lambda: (before, after) => Math.pow(before, after)
    }
};

const Denque = require('denque');

class Value {
    constructor(value) {
        this.value = value;
    }
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
        } else if (operators.includes(type)) {
            this.type = operators.indexOf(type);
        } else {
            throw `Operator has invalid operator type: ${type}`;
        }
    }
}

Operator.prototype.toString = function() {
    return operators[this.type];
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
        if (str.length > 120) {
            str = str.substr(0, 120);
        }
        this.query = str;
        if (parse) {
            parse();
        }
    }

    /**
     * Parses the user into objects
     */
    parse() {
        var query = this.query.split(/[\s(),]+/);
        this.data = new Denque();
    }

    /**
     * Calculates
     */
    calculate() {
    }
}

module.exports = Calculator;