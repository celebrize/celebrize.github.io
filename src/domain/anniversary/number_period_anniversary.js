// an anniversary that is represented by a number and a period, 
// like "10 days", "20 months", "30 years", etc
class NumberPeriodAnniversary {
    constructor(number, period) {
        this.number = number
        this.period = period
    }

    getDateObject() {
        return this.period.getDate()
    }

    getTime() {
        return this.period.getDate().getTime()
    }

    getNumber() {
        return this.number.getNumber()
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

    getPrecision() {
        return this.period.getPrecision()
    }

    getOddity() {
        return this.number.getOddity() * this.period.getOddity()
    }

    getStaticId() {
        const base = `${this.getNumberLabel()} ${this.getPeriodLabel()}`

        // stolen from https://stackoverflow.com/a/7616484
        let hash = 0, i, chr;
        for (i = 0; i < base.length; i++) {
            chr   = base.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        hash += 0xefffffff
        return hash;
    }

    hasTag(tag) {
        return this.period.hasTag(tag) || this.number.hasTag(tag)
    }
}

export default NumberPeriodAnniversary
