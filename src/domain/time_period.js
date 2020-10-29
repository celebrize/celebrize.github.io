class TimePeriod {
    constructor(dateFnc, helpText) {
        this.dateFnc = dateFnc
        this.helpText = helpText
    }

    getDate(now, number) {
        return this.dateFnc(now, number)
    }

    getHelpText() {
        return this.helpText
    }
}

module.exports = TimePeriod
