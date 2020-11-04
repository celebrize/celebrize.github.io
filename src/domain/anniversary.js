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

    getStaticId() {
        // multiplication hash function
        // @see https://xlinux.nist.gov/dads/HTML/multiplicationMethod.html#:~:text=Definition%3A%20A%20hash%20function%20that,)%200%20%3C%20A%20%3C%201.
        const n = 0.6180339887498948482 * this.date.getTime()
        return Math.floor(Number.MAX_SAFE_INTEGER * (n - Math.floor(n)))
    }
}

module.exports = Anniversary
