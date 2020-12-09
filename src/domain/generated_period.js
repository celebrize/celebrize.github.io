class GeneratedPeriod {
    constructor(date, label, oddity) {
        this.date = date
        this.label = label
        this.tags = []
        this.precision = GeneratedPeriod.SECONDS
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

GeneratedPeriod.SECONDS = "seconds"
GeneratedPeriod.DAYS ="days"

GeneratedPeriod.SECONDISH = "secondish"
GeneratedPeriod.MINUTISH = "minutish"
GeneratedPeriod.HOURISH = "hourish"
GeneratedPeriod.DAYISH = "dayish"
GeneratedPeriod.WEEKISH = "weekish"
GeneratedPeriod.MONTHISH = "monthish"
GeneratedPeriod.YEARISH = "yearish"

export default GeneratedPeriod
