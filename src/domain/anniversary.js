class Anniversary {
    constructor(number, date) {
        this.number = number
        this.date = date
    }

    getDateObject() {
        return this.date.getDate()
    }

    getTime() {
        return this.date.getDate().getTime()
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
        return this.date.getLabel()
    }

    getPeriodHelpText() {
        return this.date.getHelpText()
    }

    getPrecision() {
        return this.date.getPrecision()
    }

    getOddity() {
        return this.number.getOddity() * this.date.getOddity()
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
        return this.date.hasTag(tag) || this.number.hasTag(tag)
    }
}

module.exports = Anniversary
