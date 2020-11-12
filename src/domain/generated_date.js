class GeneratedDate {
    constructor(date, label, oddity) {
        this.date = date
        this.label = label
        this.tags = []
        this.precision = GeneratedDate.SECONDS
        this.oddity = oddity || 1
    }

    getDate() {
        return this.date
    }

    getLabel() {
        return this.label
    }

    setHelpText(text) {
        this.helpText = text
    }

    getHelpText() {
        return this.helpText
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

    setPrecision(precision) {
        this.precision = precision
    }

    getPrecision() {
        return this.precision
    }
}

GeneratedDate.SECONDS = "seconds"
GeneratedDate.DAYS ="days"

GeneratedDate.SECONDISH = "secondish"
GeneratedDate.MINUTISH = "minutish"
GeneratedDate.HOURISH = "hourish"
GeneratedDate.DAYISH = "dayish"
GeneratedDate.WEEKISH = "weekish"
GeneratedDate.MONTHISH = "monthish"
GeneratedDate.YEARISH = "yearish"

module.exports = GeneratedDate
