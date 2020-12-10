import NumberPeriodAnniversary from '../domain/anniversary/number_period_anniversary'

// generates new dates from a single numberGenerator and a period
class NumberPeriodCalculator {
    constructor(numberGenerator, period, birthday) {
        this.numberGenerator = numberGenerator.getGeneratorFunction()
        this.period = period
        this.birthday = birthday
        this.done = false
    }

    isDone() {
        return this.done
    }

    next() {
        if (this.done) { return null }

        const {value: number, done} = this.numberGenerator.next()
        this.done = done
        if (done) {
            return null
        }

        const period = this.period.generateDate(this.birthday, number.number)
        if (!period || isNaN(period.date.getTime())) {
            this.done = true
            return null
        }

        const anniversary = new NumberPeriodAnniversary(number, period)

        return anniversary
    }
}

export default NumberPeriodCalculator
