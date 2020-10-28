class GeneratedNumber {
    constructor(number, helpText) {
        this.number = number
        this.helpText = helpText
    }

    getNumber() {
        return this.number
    }

    getHelpText() {
        return this.helpText
    }

    toString() {
        return `${this.number}`
    }
}

module.exports = GeneratedNumber
