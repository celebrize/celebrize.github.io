class GeneratedNumber {
    constructor(number, helpText) {
        this.number = number
        this.helpText = helpText
    }

    setLabel(label) {
        this.label = label
    }

    getNumber() {
        return this.number
    }

    getHelpText() {
        return this.helpText
    }

    toString() {
        if(this.label) {
            return this.label
        } else {
            return `${this.number}`
        }
    }
}

module.exports = GeneratedNumber
