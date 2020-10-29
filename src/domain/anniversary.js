const { relativeTimeThreshold } = require("moment")

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

    getPeriodLabel() {
        // @TODO: dedicated label, not the help text
        return this.period.getHelpText()
    }
}

module.exports = Anniversary
