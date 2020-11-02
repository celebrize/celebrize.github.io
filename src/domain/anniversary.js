class Anniversary {
    constructor(number, period, date) {
        this.number = number
        this.period = period
        this.date = date
    }

    getTime() {
        return this.date.getTime()
    }

    getNumberLabel() {
        return this.number.toString()
    }

    getDecimalLabel() {
        return `${this.number.number}`
    }

    hasDecimalLabel() {
        return this.getNumberLabel() !== this.getDecimalLabel()
    }

    getNumberHelpText() {
        return this.number.getHelpText()
    }

    getPeriodLabel() {
        return this.period.getLabel()
    }

    getPeriodHelpText() {
        return this.period.getHelpText()
    }
}

module.exports = Anniversary
