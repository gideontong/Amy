class Value {
}

class Function extends Value {
}

class Operator {
}

/**
 * @class Calculate based on query and strings
 */
class Calculator {
    /**
     * Create a calculator object
     * @param {String} str User query
     */
    constructor(str, parse = true) {
        this.query = str;
    }

    /**
     * Parses the user into objects
     */
    parse() {
    }
}

module.exports = Calculator;