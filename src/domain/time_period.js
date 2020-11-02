class TimePeriod {
    constructor(dateFnc, label) {
        this.dateFnc = dateFnc
        this.label = label
    }

    getDate(now, number) {
        return this.dateFnc(now, number)
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
}

module.exports = TimePeriod
