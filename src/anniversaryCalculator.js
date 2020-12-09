
import Anniversary from './domain/anniversary'

const deduplicateAnniversaries = sortedAnniversaries => {
    return sortedAnniversaries.reduce((list, cur) => {
        const last = list.length > 0 ? list.pop() : undefined
        if(last !== undefined && last.getDateObject().toLocaleDateString() === cur.getDateObject().toLocaleDateString()) {
            // duplicate date
            if(last.getOddity() > cur.getOddity()) {
               list.push(cur) 
            } else {
                // skip, because it is the same date
                list.push(last)
            }
        } else {
            if (last !== undefined) { list.push(last) }
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

    calculate(birthday) {
        const anniversaries = []

        for (const numberGenerator of this.numberGenerators) {
            for (const period of this.periods) {
                const generator = numberGenerator.getGeneratorFunction()
                for (const number of generator) {
                    const genDate = period.generateDate(birthday, number.number)
                    const date = genDate.getDate()
                    if (isNaN(date.getTime())) {
                        break
                    } else if (date > this.minDate) {
                        if (date < this.maxDate) {
                            anniversaries.push(new Anniversary(number, genDate))
                        } else {
                            break
                        }
                    }
                }
            }
        }

        anniversaries.sort((a, b) => {
            return a.getTime() - b.getTime()
        })

        return deduplicateAnniversaries(anniversaries)
    }
}

export default AnniversaryCalculator