class GeneratedNumber {
    constructor(number, helpText, oddity) {
        this.number = number
        this.helpText = helpText
        this.tags = []
        this.oddity = oddity || 1
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

    setOddity(oddity) {
        this.oddity = oddity
    }
    getOddity() {
        return this.oddity
    }

    addTags(...tags) {
        // @TODO: validate
        this.tags.push(...tags)
    }

    hasTag(tag) {
        return this.tags.some(v => v === tag)
    }
}

export default GeneratedNumber
