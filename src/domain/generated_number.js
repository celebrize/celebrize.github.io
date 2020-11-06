class GeneratedNumber {
    constructor(number, helpText) {
        this.number = number
        this.helpText = helpText
        this.tags = []
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

    addTags(...tags) {
        // @TODO: validate
        this.tags.push(...tags)
    }

    hasTag(tag) {
        return this.tags.some(v => v === tag)
    }
}

module.exports = GeneratedNumber
