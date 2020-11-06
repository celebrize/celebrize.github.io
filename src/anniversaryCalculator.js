
const Anniversary = require('./domain/anniversary')

const sortAnniversaryFnc = (a, b) => {
    return a.getTime() - b.getTime()
}

const deduplicateAnniversaries = anniversaries => {
    return anniversaries.reduce((list, cur) => {
        const last = list.length > 0 ? list.slice(-1)[0] : undefined
        if(last !== undefined && last.getDateObject().toLocaleDateString() === cur.getDateObject().toLocaleDateString()) {
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
                    const genDate = period.generateDate(birthday, number.number)
                    const date = genDate.getDate()
                    if (isNaN(date.getTime())) {
                        break
                    } else if (date > this.minDate) {
                        if (date < now && !(date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear())) {
                            justPassed.push(new Anniversary(number, genDate))
                        } else if (date < this.maxDate) {
                            upcoming.push(new Anniversary(number, genDate))
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