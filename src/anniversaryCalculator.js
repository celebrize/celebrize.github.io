
class Anniversary {
    constructor(number, period, date) {
        this.number = number
        this.period = period
        this.date = date
    }
}

const sortAnniversaryFnc = (a, b) => {
    return a.date.getTime() - b.date.getTime()
}

const deduplicateAnniversaries = anniversaries => {
    return anniversaries.reduce((list, cur) => {
        const last = list.length > 0 ? list.slice(-1)[0] : undefined
        if(last !== undefined && last.date.toLocaleDateString() === cur.date.toLocaleDateString()) {
            // skip, because it is the same date
            // @TODO: add a weight function to determine which is the more convincing birthday
        } else {
            list.push(cur)
        }
        return list
    }, Array.from([]))
}

class AnniversaryCalculator {
    constructor(minDate, maxDate) {
        this.minDate = minDate
        this.maxDate = maxDate
        this.periods = []
        this.numberGenerators = []
    }

    addPeriod(period) {
        // @TODO: validate
        this.periods.push(period)
    }

    addPeriods(periods) {
        // @TODO: validate
        this.periods.push(...periods)
    }

    addNumberGenerator(generator) {
        // @TODO: validate
        this.numberGenerators.push(generator)   
    }

    addNumberGenerators(generators) {
        // @TODO: validate
        this.numberGenerators.push(...generators)
    }

    calculate(birthday, now) {
        const justPassed = []
        const upcoming = []

        for (const numberGenerator of this.numberGenerators) {
            for (const period of this.periods) {
                const generator = numberGenerator.getGeneratorFunction()
                for (const number of generator) {
                    const date = period(birthday, number.number)
                    if (isNaN(date.getTime())) {
                        break
                    } else if (date > this.minDate) {
                        if (date < now) {
                            justPassed.push(new Anniversary(number, period, date))
                        } else if (date < this.maxDate) {
                            upcoming.push(new Anniversary(number, period, date))
                        } else {
                            break
                        }
                    }
                }
            }
        }

        upcoming.sort(sortAnniversaryFnc)
        justPassed.sort(sortAnniversaryFnc)

        return [deduplicateAnniversaries(upcoming), deduplicateAnniversaries(justPassed)]
    }
}

module.exports = AnniversaryCalculator